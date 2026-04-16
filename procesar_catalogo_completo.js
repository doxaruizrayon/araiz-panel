/**
 * Procesa catalogo_total_v4.json (2GB) en modo streaming
 * y genera panel_vercel/catalogo_full.json con solo los campos
 * necesarios para el buscador del panel.
 */

const path = require('path');
const fs   = require('fs');
const { withParserAsStream } = require('./node_modules/stream-json/src/streamers/stream-array.js');

const INPUT  = path.join(__dirname, '_archivo', 'catalogo_total_v4.json');
const OUTPUT = path.join(__dirname, 'panel_vercel', 'catalogo_full.json');

if (!fs.existsSync(INPUT)) {
  console.error('ERROR: No se encuentra', INPUT);
  process.exit(1);
}

console.log('Procesando', INPUT, '...');
console.log('Esto puede tardar 2-3 minutos.\n');

const outStream = fs.createWriteStream(OUTPUT);
outStream.write('[');

let count = 0;
let first = true;

const pipeline = fs.createReadStream(INPUT).pipe(withParserAsStream());

pipeline.on('data', ({ value: art }) => {
  const slim = {
    c:  art.codigoAraiz        || '',
    cf: art.codigoFabricante   || '',
    n:  art.nombre             || '',
    m:  art.marca              || '',
    f:  art.familia            || '',
    s:  art.subfamilia         || '',
    g:  art.grupo              || '',
    i:  (art.imgMiniatura && art.imgMiniatura[0]) || ''
  };

  if (!first) outStream.write(',');
  outStream.write(JSON.stringify(slim));
  first = false;
  count++;

  if (count % 10000 === 0) process.stdout.write(`\r  ${count.toLocaleString()} artículos procesados...`);
});

pipeline.on('end', () => {
  outStream.write(']');
  outStream.end(() => {
    const size = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(1);
    console.log(`\nListo. ${count.toLocaleString()} artículos → catalogo_full.json (${size} MB)`);
  });
});

pipeline.on('error', err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
