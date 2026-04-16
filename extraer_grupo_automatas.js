/**
 * Extrae TODOS los artículos del grupo "Autómatas programables y robots industriales"
 * usando la misma lógica del ninja v4: subdivisión por marca cuando supera 10.000.
 * Salida: automatas_completo.json
 */

const https = require('https');
const fs    = require('fs');

const ELASTIC_HOST = 'my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com';
const ELASTIC_PATH = '/api/as/v1/engines/araiz-articulos-prod/search.json';
const API_KEY      = 'search-r7e1j8xyqi5nhnr44tgiqqhf';
const PAGE_SIZE    = 100;
const ELASTIC_MAX  = 10000;
const MAX_MARCAS   = 250;
const DELAY_MS     = 180;
const OUTPUT       = 'C:/PROYECTOS IA/ARAIZ/automatas_completo.json';

const FAMILIA    = 'Electricidad';
const SUBFAMILIA = 'Aparellaje eléctrico';
const GRUPO      = 'Autómatas programables y robots industriales';

// ── Deduplicación por UID ──────────────────────────────────────────────────────
const uidSet = new Set();
const todos  = [];

function addArticulo(a) {
  const key = a.codigoFabricante || a.codigoAraiz || a.nombre;
  if (!key || uidSet.has(key)) return false;
  uidSet.add(key);
  todos.push(a);
  return true;
}

// ── HTTP ───────────────────────────────────────────────────────────────────────
function elasticPost(body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request({
      hostname: ELASTIC_HOST, path: ELASTIC_PATH, method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(payload),
      },
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Parse error: ' + data.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Construcción de filtros (igual que ninja v4) ───────────────────────────────
function buildFilters(marca = null) {
  const conds = [
    { is_discontinued: 'false' },
    { classifications: FAMILIA    },
    { classifications: SUBFAMILIA },
    { classifications: GRUPO      },
  ];
  if (marca) conds.push({ brand_name: marca });
  return { all: [{ all: conds }] };
}

function buildBody(filters, page, sort = null) {
  return {
    query: '',
    filters,
    page: { current: page, size: PAGE_SIZE },
    sort: sort ?? [{ priority: 'desc' }, { brand_priority: 'desc' }],
  };
}

// ── Mapeo igual que ninja v4 ───────────────────────────────────────────────────
function mapear(r) {
  const raw = f => r[f]?.raw ?? '';
  return {
    nombre:           raw('descr_short'),
    marca:            raw('brand_name'),
    codigoFabricante: raw('env_1_id'),
    codigoAraiz:      raw('env_2_id'),
    descripcion:      raw('descr_long'),
    etimClase:        raw('etim_class_name'),
    etimGrupo:        raw('etim_group_name'),
    stockDisponible:  raw('stock'),
    imgMiniatura:     r['img_thumbs']?.raw?.[0] ?? '',
  };
}

// ── Paginación de un filtro concreto ───────────────────────────────────────────
async function paginarFiltro(filters, etiqueta = '') {
  let page = 1, totalPaginas = 1;
  do {
    let resp;
    try { resp = await elasticPost(buildBody(filters, page)); }
    catch (e) { console.error(`\n  ERROR pág ${page}: ${e.message}`); break; }

    if (!resp.results?.length) break;
    totalPaginas = resp.meta?.page?.total_pages ?? 1;
    resp.results.forEach(r => addArticulo(mapear(r)));
    process.stdout.write(`\r  ${etiqueta}Pág ${page}/${totalPaginas} — ${todos.length} únicos`);

    if (page >= totalPaginas) break;
    page++;
    await sleep(DELAY_MS);
  } while (true);
  process.stdout.write('\n');
}

// ── Obtener marcas del grupo ───────────────────────────────────────────────────
async function getMarcas(filters) {
  try {
    const resp = await elasticPost({
      query: '', filters,
      facets: { brand_name: { type: 'value', size: MAX_MARCAS } },
      page: { current: 1, size: 1 },
    });
    return (resp.facets?.brand_name?.[0]?.data ?? []).map(b => b.value);
  } catch (e) { console.error(`  ERROR marcas: ${e.message}`); return []; }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\nExtrayendo: ${FAMILIA} > ${SUBFAMILIA} > ${GRUPO}`);
  console.log('Usando subdivisión por marca (igual que ninja v4)\n');

  const filters = buildFilters();

  // Probe: ¿cuántos hay en total?
  const probe = await elasticPost({ query: '', filters, page: { current: 1, size: 1 } });
  const total = probe.meta?.page?.total_results ?? 0;
  console.log(`Total en Araiz: ${total} artículos\n`);
  await sleep(DELAY_MS);

  if (total < ELASTIC_MAX) {
    // Cabe en paginación directa
    console.log('< 10.000 → paginación directa');
    await paginarFiltro(filters, '');
  } else {
    // Subdivisión por marca (como ninja v4)
    console.log(`>= 10.000 → subdividiendo por marca...`);
    const marcas = await getMarcas(filters);
    console.log(`${marcas.length} marcas encontradas: ${marcas.join(', ')}\n`);
    await sleep(DELAY_MS);

    for (let i = 0; i < marcas.length; i++) {
      const marca = marcas[i];
      const fMarca = buildFilters(marca);

      // Probe por marca
      const pm = await elasticPost({ query: '', filters: fMarca, page: { current: 1, size: 1 } });
      const tm = pm.meta?.page?.total_results ?? 0;
      process.stdout.write(`[${i+1}/${marcas.length}] ${marca.padEnd(25)} → ${tm} arts\n`);
      await sleep(DELAY_MS);

      await paginarFiltro(fMarca, `${marca}: `);
      await sleep(DELAY_MS);
    }
  }

  // Guardar
  todos.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
  fs.writeFileSync(OUTPUT, JSON.stringify(todos, null, 2), 'utf8');
  console.log(`\n✓ Guardado: ${OUTPUT} (${todos.length} artículos únicos)\n`);

  // Mostrar lista ordenada
  console.log('LISTA COMPLETA (primeros 50):');
  todos.slice(0, 50).forEach((a, i) =>
    console.log(`  [${String(i).padStart(4)}] ${(a.codigoFabricante||'').padEnd(18)} | ${a.marca.padEnd(22)} | ${a.nombre.slice(0,65)}`)
  );
  if (todos.length > 50) console.log(`  ... y ${todos.length - 50} más`);
}

run().catch(console.error);
