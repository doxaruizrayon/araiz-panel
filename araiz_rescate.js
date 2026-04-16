/**
 * araiz_rescate.js
 * Tercera capa: rescata los artículos de PHOENIX CONTACT y WEIDMULLER
 * que superaron el límite de 10.000 de Elastic en v2.
 *
 * Estrategia: inversión de ordenación.
 *   v2 paginó con priority DESC → capturó los 10K de mayor prioridad.
 *   Este script pagina con los mismos filtros pero en DISTINTO ORDEN,
 *   obteniendo ventanas diferentes del catálogo:
 *     Pasada 1: priority ASC      (los 10K de menor prioridad)
 *     Pasada 2: best_seller ASC   (los 10K menos vendidos)
 *     Pasada 3: brand_priority ASC
 *
 *   El dedup por uid garantiza que no se añade nada que ya esté en v2.
 *
 * Uso: node araiz_rescate.js
 * Prerequisito: catalogo_total_v2.json debe existir.
 */

const https = require('https');
const fs    = require('fs');

// ── Configuración ─────────────────────────────────────────────────────────────

const ELASTIC_HOST = 'my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com';
const ELASTIC_PATH = '/api/as/v1/engines/araiz-articulos-prod/search.json';
const API_KEY      = 'search-r7e1j8xyqi5nhnr44tgiqqhf';

const PAGE_SIZE = 100;
const DELAY_MS  = 200;

const INPUT  = 'C:/PROYECTOS IA/ARAIZ/catalogo_total_v2.json';
const OUTPUT = 'C:/PROYECTOS IA/ARAIZ/catalogo_total_v3.json';

// Combos que saturaron el límite en v2
const OBJETIVOS = [
  {
    label:     'PHOENIX CONTACT — Bornas',
    familia:   'Material de conexión eléctrica',
    subfamilia:'Bornas',
    grupo:     null,
    marca:     'PHOENIX CONTACT',
  },
  {
    label:     'PHOENIX CONTACT — Conectores',
    familia:   'Material de conexión eléctrica',
    subfamilia:'Conectores',
    grupo:     null,
    marca:     'PHOENIX CONTACT',
  },
  {
    label:     'WEIDMULLER — Conectores',
    familia:   'Material de conexión eléctrica',
    subfamilia:'Conectores',
    grupo:     null,
    marca:     'WEIDMULLER',
  },
];

// Órdenes de paginación alternativos (v2 usó priority DESC + brand_priority DESC)
const PASADAS = [
  [{ priority: 'asc' }],
  [{ best_seller: 'asc' }],
  [{ brand_priority: 'asc' }],
  [{ priority: 'asc'  }, { best_seller: 'asc' }],
  [{ best_seller: 'asc' }, { priority: 'asc' }],
];

// ── Helpers HTTP ──────────────────────────────────────────────────────────────

function elasticPost(body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request({
      hostname: ELASTIC_HOST,
      path:     ELASTIC_PATH,
      method:   'POST',
      headers:  {
        'Content-Type':   'application/json',
        'Authorization':  `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON inválido: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Extracción con un sort concreto ───────────────────────────────────────────

async function paginarConSort(objetivo, sort) {
  const filtros = [
    { is_discontinued: 'false'  },
    { classifications: objetivo.familia    },
    { classifications: objetivo.subfamilia },
    { brand_name:      objetivo.marca      },
  ];
  if (objetivo.grupo) filtros.push({ classifications: objetivo.grupo });

  const articulos = [];
  let pagina = 1;
  let totalPaginas = 1;

  do {
    const body = {
      query:   '',
      filters: { all: [{ all: filtros }] },
      result_fields: {
        env_1_id:        { raw: {} },
        env_1_id_unique: { raw: {} },
        env_2_id:        { raw: {} },
        brand_name:      { raw: {} },
        descr_short:     { raw: {} },
      },
      page: { current: pagina, size: PAGE_SIZE },
      sort,
    };

    let resp;
    try {
      resp = await elasticPost(body);
    } catch (e) {
      console.error(`      ERROR pág ${pagina}: ${e.message}`);
      break;
    }
    if (!resp.results?.length) break;

    totalPaginas = resp.meta?.page?.total_pages ?? 1;
    for (const r of resp.results) {
      const uid = r.env_1_id_unique?.raw ?? '';
      articulos.push({
        uid,
        familia:          objetivo.familia,
        subfamilia:       objetivo.subfamilia,
        grupo:            objetivo.grupo ?? '',
        nombre:           r.descr_short?.raw ?? '',
        marca:            r.brand_name?.raw   ?? '',
        codigoFabricante: r.env_1_id?.raw     ?? '',
        codigoAraiz:      r.env_2_id?.raw     ?? '',
      });
    }

    process.stdout.write(`\r        Pág ${pagina}/${totalPaginas} — ${articulos.length} arts leídos`);
    if (pagina >= totalPaginas) break;
    pagina++;
    await sleep(DELAY_MS);

  } while (true);

  process.stdout.write('\n');
  return articulos;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

(async () => {
  console.log('══════════════════════════════════════════════════════');
  console.log(' ARAIZ RESCATE — Tercera capa (inversión de orden)   ');
  console.log('══════════════════════════════════════════════════════\n');

  // Cargar catálogo existente
  console.log(`Cargando ${INPUT}...`);
  let catalogo;
  try {
    catalogo = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  } catch (e) {
    console.error('ERROR al leer catalogo_total_v2.json:', e.message);
    process.exit(1);
  }

  // Mapa global de UIDs existentes
  const mapaGlobal = new Map();
  for (const a of catalogo) {
    const key = a.uid || `${a.codigoFabricante}|${a.nombre}`;
    mapaGlobal.set(key, a);
  }
  console.log(`  → ${mapaGlobal.size} artículos únicos cargados del v2\n`);

  let totalNuevos = 0;

  // Procesar cada objetivo
  for (const obj of OBJETIVOS) {
    console.log(`\n┌─────────────────────────────────────────────────────`);
    console.log(`│ ${obj.label}`);
    console.log(`└─────────────────────────────────────────────────────`);

    let nuevosEsteObjetivo = 0;

    for (let p = 0; p < PASADAS.length; p++) {
      const sort      = PASADAS[p];
      const sortLabel = sort.map(s => Object.entries(s).map(([k, v]) => `${k} ${v}`).join('+')).join(', ');
      console.log(`\n  Pasada ${p + 1}/${PASADAS.length}: sort [${sortLabel}]`);

      const arts = await paginarConSort(obj, sort);

      let nuevosPasada = 0;
      for (const a of arts) {
        const key = a.uid || `${a.codigoFabricante}|${a.nombre}`;
        if (!mapaGlobal.has(key)) {
          mapaGlobal.set(key, a);
          nuevosPasada++;
          nuevosEsteObjetivo++;
          totalNuevos++;
        }
      }

      console.log(`  → ${nuevosPasada} artículos NUEVOS en esta pasada (total global: ${mapaGlobal.size})`);

      // Si dos pasadas seguidas no aportan nada nuevo, no merece la pena continuar
      if (nuevosPasada === 0 && p > 0) {
        console.log(`  → Sin artículos nuevos dos pasadas seguidas. Objetivo saturado.`);
        break;
      }

      await sleep(DELAY_MS);
    }

    console.log(`\n  SUBTOTAL nuevos para ${obj.label}: ${nuevosEsteObjetivo}`);
  }

  // Guardar resultado final
  const resultado = [...mapaGlobal.values()].map(({ uid, ...rest }) => rest); // quitar uid interno
  fs.writeFileSync(OUTPUT, JSON.stringify(resultado, null, 2), 'utf8');

  console.log('\n══════════════════════════════════════════════════════');
  console.log(' RESCATE COMPLETADO');
  console.log(`  Artículos nuevos rescatados : ${totalNuevos}`);
  console.log(`  Total catálogo v3           : ${resultado.length}`);
  console.log(`  Archivo                     : ${OUTPUT}`);
  console.log('══════════════════════════════════════════════════════');
})();
