/**
 * araiz_ninja_v4.js — Catálogo completo con todos los campos ETIM y técnicos.
 *
 * Arquitectura de memoria eficiente:
 *  - Solo los UIDs se guardan en memoria (Set<string>, ~10MB)
 *  - Cada artículo se escribe al disco inmediatamente tras extraerlo (NDJSON)
 *  - Al finalizar, convierte NDJSON → JSON array de forma totalmente en streaming
 *  - Checkpoint recuperable: guarda UIDs + grupo cada 10 grupos
 *
 * Uso: node araiz_ninja_v4.js
 */

const https    = require('https');
const fs       = require('fs');
const readline = require('readline');

// ── Configuración ─────────────────────────────────────────────────────────────

const ELASTIC_HOST = 'my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com';
const ELASTIC_PATH = '/api/as/v1/engines/araiz-articulos-prod/search.json';
const API_KEY      = 'search-r7e1j8xyqi5nhnr44tgiqqhf';
const CLASS_URL    = 'https://www.araiz.com/api/productpublic/getproductclasifications';

const PAGE_SIZE   = 100;
const DELAY_MS    = 200;
const ELASTIC_MAX = 10000;
const MAX_MARCAS  = 250;

const DIR        = 'C:/PROYECTOS IA/ARAIZ/';
const NDJSON     = DIR + 'araiz_v4_temp.ndjson';   // un artículo por línea
const UID_FILE   = DIR + 'araiz_v4_uids.json';     // Set de UIDs para checkpoint
const CHECKPOINT = DIR + 'araiz_v4_checkpoint.json';
const OUTPUT     = DIR + 'catalogo_total_v4.json';  // archivo final

const RESCUE_SORTS = [
  [{ priority: 'asc' }],
  [{ best_seller: 'asc' }],
  [{ brand_priority: 'asc' }],
];

// ── Estado global (solo UIDs, no datos) ──────────────────────────────────────

const uidSet    = new Set();
let ndjsonStream;     // WriteStream abierto durante toda la ejecución

function uidKey(a) {
  return a._uid || `${a.codigoFabricante}|${a.nombre}`;
}

function writeArticle(article) {
  const key = uidKey(article);
  if (uidSet.has(key)) return false;
  uidSet.add(key);
  ndjsonStream.write(JSON.stringify(article) + '\n');
  return true;
}

// ── Helpers HTTP ──────────────────────────────────────────────────────────────

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`GET JSON inválido: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

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
        catch (e) { reject(new Error(`POST JSON inválido: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Filtros y body ────────────────────────────────────────────────────────────

function buildFilters(nodo, marca = null, sinSubfamilia = false) {
  const conds = [{ is_discontinued: 'false' }];
  conds.push({ classifications: nodo.familia });
  if (!sinSubfamilia && nodo.subfamilia) conds.push({ classifications: nodo.subfamilia });
  if (nodo.grupo)  conds.push({ classifications: nodo.grupo });
  if (marca)       conds.push({ brand_name: marca });
  return { all: [{ all: conds }] };
}

function buildBody(filters, page, sort = null) {
  return {
    query:   '',
    filters,
    // Sin result_fields → Elastic devuelve TODOS los campos
    page: { current: page, size: PAGE_SIZE },
    sort: sort ?? [{ priority: 'desc' }, { brand_priority: 'desc' }],
  };
}

// ── Mapeo completo de artículo ────────────────────────────────────────────────

function mapearArticulo(r, nodo) {
  const raw = f => r[f]?.raw ?? null;
  return {
    _uid:             raw('env_1_id_unique') ?? '',  // prefijo _ = campo interno para dedup
    familia:          nodo.familia,
    subfamilia:       nodo.subfamilia,
    grupo:            nodo.grupo ?? '',
    codigoFabricante: raw('env_1_id')        ?? '',
    codigoAraiz:      raw('env_2_id')        ?? '',
    ean:              raw('ean_codes')        ?? [],
    marca:            raw('brand_name')      ?? '',
    marcaId:          raw('brand_id')        ?? null,
    marcaRef:         raw('brand_ref')       ?? '',
    nombre:           raw('descr_short')     ?? '',
    descripcion:      raw('descr_long')      ?? '',
    keywords:         raw('keywords')        ?? [],
    imgMiniatura:     raw('img_thumbs')      ?? [],
    imgGrande:        raw('img_mains')       ?? [],
    docsTecnicos:     raw('doc_tech')        ?? [],
    docsUrls:         raw('doc_tech_env_2')  ?? [],
    docsEtiquetas:    raw('doc_tech_env_2_labels') ?? [],
    stockDisponible:  raw('stock')           ?? 0,
    stockCodigo:      raw('stock_code')      ?? '',
    unidadMinima:     raw('sale_unit_min')   ?? 0,
    esCable:          raw('is_cable')        ?? 'false',
    esTaxRae:         raw('is_tax_rae')      ?? 'false',
    etimClase:        raw('etim_class_name') ?? '',
    etimGrupo:        raw('etim_group_name') ?? '',
    etimNombres:      raw('etim_name')       ?? [],
    etimIds:          raw('etim_ids')        ?? [],
    etimValores:      raw('etim_values')     ?? [],
    etimPares:        raw('etim_namevalues') ?? [],
    fechaActualizacion: raw('chk_ts')        ?? '',
  };
}

// ── Paginación básica ─────────────────────────────────────────────────────────

async function paginarTodo(filters, nodo, sort = null, etiqueta = '') {
  let nuevos = 0;
  let pagina = 1, totalPaginas = 1;
  do {
    let resp;
    try { resp = await elasticPost(buildBody(filters, pagina, sort)); }
    catch (e) { console.error(`\n      ERROR pág ${pagina}: ${e.message}`); break; }
    if (!resp.results?.length) break;
    totalPaginas = resp.meta?.page?.total_pages ?? 1;
    for (const r of resp.results) {
      const art = mapearArticulo(r, nodo);
      if (writeArticle(art)) nuevos++;
    }
    process.stdout.write(`\r      ${etiqueta}Pág ${pagina}/${totalPaginas} — ${uidSet.size} total`);
    if (pagina >= totalPaginas) break;
    pagina++;
    await sleep(DELAY_MS);
  } while (true);
  process.stdout.write('\n');
  return nuevos;
}

// ── Marcas vía facet ──────────────────────────────────────────────────────────

async function getMarcas(filters) {
  try {
    const resp = await elasticPost({
      query: '', filters,
      facets: { brand_name: { type: 'value', size: MAX_MARCAS } },
      page: { current: 1, size: 1 },
    });
    return (resp.facets?.brand_name?.[0]?.data ?? []).map(b => b.value);
  } catch (e) { console.error(`      ERROR marcas: ${e.message}`); return []; }
}

// ── Extractor principal por grupo ─────────────────────────────────────────────

async function extraerGrupo(nodo) {
  let filters = buildFilters(nodo);

  // Probe rápido
  let total = 0;
  try {
    const p = await elasticPost({ query: '', filters, page: { current: 1, size: 1 } });
    total = p.meta?.page?.total_results ?? 0;
  } catch (e) { console.error(`      ERROR probe: ${e.message}`); return 0; }
  await sleep(DELAY_MS);

  // Fallback sin subfamilia
  if (total === 0 && nodo.subfamilia) {
    const filFb = buildFilters(nodo, null, true);
    try {
      const p2 = await elasticPost({ query: '', filters: filFb, page: { current: 1, size: 1 } });
      const t2 = p2.meta?.page?.total_results ?? 0;
      if (t2 > 0) {
        console.log(`      [FALLBACK] sin subfamilia → ${t2} arts`);
        filters = filFb; total = t2;
      }
    } catch (_) {}
    await sleep(DELAY_MS);
  }

  if (total === 0) { console.log('      Sin artículos.'); return 0; }
  console.log(`      Total Elastic: ${total}`);

  if (total < ELASTIC_MAX) {
    return await paginarTodo(filters, nodo);
  }

  // Subdivisión por marca
  console.log(`      [10K] Subdividiendo por marca...`);
  const marcas = await getMarcas(filters);
  if (marcas.length >= MAX_MARCAS) console.warn(`      AVISO: ${MAX_MARCAS}+ marcas`);
  console.log(`      ${marcas.length} marcas`);
  await sleep(DELAY_MS);

  let nuevosGrupo = 0;

  for (let i = 0; i < marcas.length; i++) {
    const marca = marcas[i];
    const filM  = buildFilters(nodo, marca);
    process.stdout.write(`\r      [${i + 1}/${marcas.length}] ${marca.slice(0, 25).padEnd(25)}`);

    const pM = await elasticPost({ query: '', filters: filM, page: { current: 1, size: 1 } });
    const totalM = pM.meta?.page?.total_results ?? 0;
    await sleep(DELAY_MS);
    if (totalM === 0) continue;

    nuevosGrupo += await paginarTodo(filM, nodo, null, `  ${marca.slice(0, 15)} `);

    // Rescue inline si satura
    if (totalM >= ELASTIC_MAX) {
      console.log(`\n      [RESCUE] ${marca} saturó → sorts invertidos`);
      for (const sort of RESCUE_SORTS) {
        const n = await paginarTodo(filM, nodo, sort, `    rescue `);
        nuevosGrupo += n;
        if (n === 0) break;
        await sleep(DELAY_MS);
      }
    }
    await sleep(DELAY_MS);
  }

  // Sin marca
  nuevosGrupo += await paginarTodo(filters, nodo, null, '  sin-marca ');

  return nuevosGrupo;
}

// ── Árbol de clasificaciones ──────────────────────────────────────────────────

function buildTree(clasificaciones) {
  const vistos = new Set();
  const grupos = [];
  for (const c of clasificaciones) {
    const key = `${c.nivCl1}|${c.nivCl2}|${c.nivCl3 ?? 'null'}`;
    if (vistos.has(key)) continue;
    vistos.add(key);
    grupos.push({
      familiaId: c.nivCl1, familia: c.desCl1,
      subfamiliaId: c.nivCl2, subfamilia: c.desCl2,
      grupoId: c.nivCl3, grupo: c.desCl3 ?? null,
    });
  }
  return grupos;
}

// ── Checkpoint ────────────────────────────────────────────────────────────────

async function guardarCheckpoint(idx) {
  // Flush del stream antes de guardar
  await new Promise(r => ndjsonStream.write('', r));
  fs.writeFileSync(UID_FILE, JSON.stringify([...uidSet]), 'utf8');
  fs.writeFileSync(CHECKPOINT, JSON.stringify({ ultimoIdx: idx }), 'utf8');
}

async function cargarCheckpoint() {
  try {
    if (!fs.existsSync(CHECKPOINT)) return 0;
    const cp = JSON.parse(fs.readFileSync(CHECKPOINT, 'utf8'));

    // Reconstruir uidSet desde NDJSON (más fiable que el UID_FILE)
    if (fs.existsSync(NDJSON)) {
      console.log('  Leyendo UIDs del archivo parcial...');
      const rl = readline.createInterface({
        input: fs.createReadStream(NDJSON, { encoding: 'utf8' }),
        crlfDelay: Infinity,
      });
      for await (const line of rl) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line);
          uidSet.add(uidKey(obj));
        } catch (_) {}
      }
    }
    console.log(`[CHECKPOINT] ${uidSet.size} UIDs cargados → reanudando grupo ${cp.ultimoIdx + 1}`);
    return cp.ultimoIdx + 1;
  } catch (_) { return 0; }
}

// ── Conversión NDJSON → JSON array (totalmente en streaming) ─────────────────

async function convertirAJSON() {
  console.log('\nConvirtiendo NDJSON → JSON array (streaming)...');
  return new Promise((resolve, reject) => {
    const inStream  = fs.createReadStream(NDJSON, { encoding: 'utf8' });
    const outStream = fs.createWriteStream(OUTPUT, { encoding: 'utf8' });
    const rl = readline.createInterface({ input: inStream, crlfDelay: Infinity });

    outStream.write('[');
    let first = true;
    let count = 0;

    rl.on('line', (line) => {
      if (!line.trim()) return;
      try {
        const obj = JSON.parse(line);
        const { _uid, ...rest } = obj;  // quitar campo interno
        if (!first) outStream.write(',');
        outStream.write(JSON.stringify(rest));
        first = false;
        count++;
        if (count % 50000 === 0) process.stdout.write(`\r  ${count} artículos convertidos...`);
      } catch (_) {}
    });

    rl.on('close', () => {
      outStream.write(']');
      outStream.end();
      outStream.on('finish', () => {
        console.log(`\r  Conversión completa: ${count} artículos          `);
        resolve(count);
      });
    });

    rl.on('error', reject);
    inStream.on('error', reject);
  });
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

(async () => {
  console.log('══════════════════════════════════════════════════════');
  console.log(' ARAIZ NINJA v4 — Catálogo completo con ETIM y docs  ');
  console.log(' (arquitectura streaming, sin límite de memoria)      ');
  console.log('══════════════════════════════════════════════════════\n');

  // Cargar checkpoint si existe
  const startIdx = await cargarCheckpoint();
  const esResumen = startIdx > 0;

  // Abrir stream NDJSON (append si reanudamos, nuevo si empezamos)
  ndjsonStream = fs.createWriteStream(NDJSON, {
    flags:    esResumen ? 'a' : 'w',
    encoding: 'utf8',
  });

  // Paso 1: Jerarquía
  console.log('[1/2] Obteniendo árbol de clasificaciones...');
  let clasificaciones;
  try { clasificaciones = await httpGet(CLASS_URL); }
  catch (e) { console.error('ERROR:', e.message); process.exit(1); }
  const grupos  = buildTree(clasificaciones);
  const familias = [...new Set(grupos.map(g => g.familia))];
  console.log(`  → ${grupos.length} grupos en ${familias.length} familias\n`);

  // Paso 2: Extracción
  console.log('[2/2] Extrayendo artículos con todos los campos...\n');

  for (let i = startIdx; i < grupos.length; i++) {
    const nodo = grupos[i];
    console.log(`[${i + 1}/${grupos.length}] ${nodo.familia} > ${nodo.subfamilia} > ${nodo.grupo ?? '(sin grupo)'}`);

    const nuevos = await extraerGrupo(nodo);
    console.log(`      Nuevos: ${nuevos} | Total acumulado: ${uidSet.size}`);

    if ((i + 1) % 10 === 0) {
      await guardarCheckpoint(i);
      console.log(`      [CHECKPOINT] Guardado en grupo ${i + 1}\n`);
    }
    await sleep(DELAY_MS);
  }

  // Cerrar stream NDJSON
  await new Promise(r => ndjsonStream.end(r));

  // Paso 3: Convertir a JSON array final
  const total = await convertirAJSON();

  // Limpiar archivos temporales
  [NDJSON, UID_FILE, CHECKPOINT].forEach(f => { try { if (fs.existsSync(f)) fs.unlinkSync(f); } catch (_) {} });

  console.log('\n══════════════════════════════════════════════════════');
  console.log(' COMPLETADO');
  console.log(`  Artículos únicos : ${total}`);
  console.log(`  Grupos procesados: ${grupos.length}`);
  console.log(`  Campos por art.  : ~30 (ETIM, EAN, imágenes, docs, stock...)`);
  console.log(`  Archivo          : ${OUTPUT}`);
  console.log('══════════════════════════════════════════════════════');
})();
