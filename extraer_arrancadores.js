const https = require('https');
const fs = require('fs');

const HOST = 'my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com';
const PATH = '/api/as/v1/engines/araiz-articulos-prod/search.json';
const KEY = 'search-r7e1j8xyqi5nhnr44tgiqqhf';

function search(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: HOST, path: PATH, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${KEY}` }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => resolve(JSON.parse(raw)));
    });
    req.on('error', reject);
    req.end(data);
  });
}

const FIELDS = {
  id: { raw: {} }, brand_name: { raw: {} }, brand_ref: { raw: {} },
  descr_short: { raw: {} }, descr_long: { raw: {} },
  classification_l1: { raw: {} }, classification_l2: { raw: {} }, classification_l3: { raw: {} },
  etim_class_name: { raw: {} }, etim_ids: { raw: {} }, img_mains: { raw: {} }
};

async function getAll(filters, tag) {
  let page = 1, all = [];
  while (true) {
    const r = await search({
      query: '', filters: { all: filters },
      page: { size: 100, current: page }, result_fields: FIELDS
    });
    const results = r.results || [];
    if (results.length === 0) break;
    all.push(...results.map(x => {
      const o = {};
      for (const [k,v] of Object.entries(x)) { if (v && v.raw !== undefined) o[k] = v.raw; }
      return o;
    }));
    if (page % 10 === 0 || results.length < 100) console.log(`  ${tag} pág ${page}: ${all.length}`);
    if (results.length < 100 || page >= 100) break;
    page++;
  }
  return all;
}

async function main() {
  const facetRes = await search({
    query: '',
    filters: { all: [{ classification_l2: 'Aparellaje eléctrico' }, { classification_l3: 'Arrancadores e inversores' }]},
    facets: { brand_name: { type: 'value', size: 100 } },
    page: { size: 1 }
  });
  const marcas = facetRes.facets.brand_name[0].data.sort((a, b) => b.count - a.count);
  console.log(`Marcas: ${marcas.length}`);
  marcas.forEach(m => console.log(`  ${m.value}: ${m.count}`));
  console.log(`Total: ${marcas.reduce((s, m) => s + m.count, 0)}\n`);

  let todos = [];
  for (const m of marcas) {
    console.log(`Extrayendo ${m.value} (${m.count})...`);
    const arts = await getAll([
      { classification_l2: 'Aparellaje eléctrico' },
      { classification_l3: 'Arrancadores e inversores' },
      { brand_name: m.value }
    ], m.value);
    todos.push(...arts);
  }

  const mapa = new Map();
  todos.forEach(a => mapa.set(a.id, a));
  const unicos = [...mapa.values()];
  console.log(`\nExtraídos: ${todos.length} → Únicos: ${unicos.length}`);
  fs.writeFileSync('arrancadores_completo.json', JSON.stringify(unicos, null, 2));

  // Resumen por clase ETIM
  const clases = {};
  unicos.forEach(a => {
    const c = a.etim_class_name || 'SIN CLASE';
    const marca = a.brand_name || 'SIN MARCA';
    if (!clases[c]) clases[c] = { total: 0, marcas: {} };
    clases[c].total++;
    clases[c].marcas[marca] = (clases[c].marcas[marca] || 0) + 1;
  });
  console.log('\n--- Clases ETIM ---');
  Object.entries(clases).sort((a, b) => b[1].total - a[1].total).forEach(([c, v]) => {
    const top = Object.entries(v.marcas).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([m,n])=>m+':'+n).join(', ');
    console.log(`${v.total} | ${c.split('$$')[1] || c} | ${top}`);
  });
}

main().catch(console.error);
