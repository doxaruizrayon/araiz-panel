/**
 * Busca artículos en catalogo_total_v4.json por codigoFabricante
 * Lee el archivo en chunks de 4MB sin cargarlo entero en memoria.
 * Uso: node buscar_en_v4.js 294083
 *      node buscar_en_v4.js "Servo Accurax"
 */

const fs   = require('fs');
const path = require('path');

const ARCHIVO    = 'C:/PROYECTOS IA/ARAIZ/catalogo_total_v4.json';
const CHUNK_SIZE = 4 * 1024 * 1024; // 4 MB
const TERMINO    = process.argv[2] || '';

if (!TERMINO) {
  console.error('Uso: node buscar_en_v4.js <término>');
  process.exit(1);
}

console.log(`Buscando "${TERMINO}" en catalogo_total_v4.json (2GB)...`);

const fd          = fs.openSync(ARCHIVO, 'r');
const stat        = fs.statSync(ARCHIVO);
const totalBytes  = stat.size;

let sobrante      = '';
let encontrados   = [];
let offset        = 0;
let reporteEach   = Math.floor(totalBytes / 20); // progreso cada 5%
let siguienteRepo = reporteEach;

const buf = Buffer.alloc(CHUNK_SIZE);

while (offset < totalBytes) {
  const leidos = fs.readSync(fd, buf, 0, CHUNK_SIZE, offset);
  if (leidos === 0) break;

  const texto  = sobrante + buf.slice(0, leidos).toString('utf8');
  offset      += leidos;

  // Progreso
  if (offset >= siguienteRepo) {
    process.stdout.write(`\r  Progreso: ${Math.round(offset/totalBytes*100)}%  (${encontrados.length} encontrados)`);
    siguienteRepo += reporteEach;
  }

  // Guardar sobrante para no cortar un objeto a mitad
  // El sobrante es lo que queda después del último '},{' o '},' completo
  // Buscamos el último '}' seguido de ',' o ']'
  const ultimoCierre = Math.max(
    texto.lastIndexOf('},{"familia"'),
    texto.lastIndexOf('{"familia"')  // primer artículo del array
  );

  let procesado;
  if (ultimoCierre > 0) {
    procesado = texto.slice(0, ultimoCierre);
    sobrante  = texto.slice(ultimoCierre);
  } else {
    procesado = texto;
    sobrante  = '';
  }

  // Buscar el término en el texto procesado
  if (procesado.toLowerCase().includes(TERMINO.toLowerCase())) {
    // Encontrar todos los objetos que contienen el término
    const regex = /\{"familia":[^}]+(?:\{[^}]*\}[^}]*)*/g;
    // Mejor: partir por '{"familia"' y buscar el término en cada fragmento
    const partes = procesado.split('{"familia":');
    for (let i = 1; i < partes.length; i++) {
      const fragmento = '{"familia":' + partes[i];
      if (fragmento.toLowerCase().includes(TERMINO.toLowerCase())) {
        // Intentar parsear el objeto completo
        try {
          // Encontrar el cierre del objeto
          let depth = 0, j = 0, fin = -1;
          for (; j < Math.min(fragmento.length, 5000); j++) {
            if (fragmento[j] === '{') depth++;
            else if (fragmento[j] === '}') { depth--; if (depth === 0) { fin = j + 1; break; } }
          }
          if (fin > 0) {
            const obj = JSON.parse(fragmento.slice(0, fin));
            encontrados.push(obj);
          }
        } catch (_) {
          // Si no parsea, guardar el fragmento crudo (primeros 300 chars)
          encontrados.push({ _raw: fragmento.slice(0, 300) });
        }
      }
    }
  }

  if (encontrados.length >= 20) break; // máximo 20 resultados
}

fs.closeSync(fd);
process.stdout.write('\n');

if (!encontrados.length) {
  console.log(`\nNo se encontró "${TERMINO}" en el catálogo v4.`);
} else {
  console.log(`\n${encontrados.length} resultado(s) para "${TERMINO}":\n`);
  encontrados.forEach((a, i) => {
    if (a._raw) {
      console.log(`[${i+1}] (fragmento crudo) ${a._raw}`);
    } else {
      console.log(`[${i+1}] codigoFabricante: ${a.codigoFabricante || '(vacío)'}`);
      console.log(`     codigoAraiz:      ${a.codigoAraiz || '(vacío)'}`);
      console.log(`     nombre:           ${a.nombre || '(vacío)'}`);
      console.log(`     marca:            ${a.marca || '(vacío)'}`);
      console.log(`     familia:          ${a.familia || ''} > ${a.subfamilia || ''} > ${a.grupo || ''}`);
      console.log('');
    }
  });
}
