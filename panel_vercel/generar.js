/**
 * generar.js — Prepara el panel para publicar en Vercel.
 *
 * Qué hace:
 *  1. Lee todos los .txt de BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ/
 *  2. Los convierte a base_conocimiento.json (datos del panel)
 *  3. Copia catalogo_completo.json como catalogo.json
 *
 * Uso (ejecutar desde C:\PROYECTOS IA\ARAIZ\):
 *   node panel_vercel/generar.js
 *
 * Cuando termina, la carpeta panel_vercel/ está lista para publicar.
 */

const fs   = require('fs');
const path = require('path');

const BASE_DIR      = path.join(__dirname, '..', 'BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ');
const CATALOGO_SRC  = path.join(__dirname, '..', 'catalogo_completo.json');
const OUT_BASE      = path.join(__dirname, 'base_conocimiento.json');
const OUT_CATALOGO  = path.join(__dirname, 'catalogo.json');

function normText(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

console.log('Leyendo cuadros...');
const files = fs.readdirSync(BASE_DIR).filter(f => f.endsWith('.txt')).sort();

const articulos = files.map(filename => {
  const content = fs.readFileSync(path.join(BASE_DIR, filename), 'utf8');
  const lines   = content.split('\n');
  const titleMatch = lines[0].match(/CUADRO RESUMEN[^—]*—\s*(.+)/);
  const title   = titleMatch ? titleMatch[1].trim() : filename.replace('.txt','').replace(/_/g,' ').toUpperCase();
  const familyLine = lines.find(l => l.startsWith('Familia:'));
  const family  = familyLine ? familyLine.replace('Familia:','').trim() : '';
  const refLine = lines.find(l => l.startsWith('Ejemplo en Araiz:'));
  const ref     = refLine ? refLine.replace('Ejemplo en Araiz:','').trim() : '';
  const familiaTop = family.split('>')[0].trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return { filename, title, family, familiaTop, ref, content, normContent: normText(content) };
});

fs.writeFileSync(OUT_BASE, JSON.stringify(articulos), 'utf8');
console.log(`✓ base_conocimiento.json — ${articulos.length} cuadros`);

// Copiar catálogo
if (fs.existsSync(CATALOGO_SRC)) {
  fs.copyFileSync(CATALOGO_SRC, OUT_CATALOGO);
  console.log('✓ catalogo.json — copiado');
} else {
  fs.writeFileSync(OUT_CATALOGO, '[]', 'utf8');
  console.log('⚠ catalogo_completo.json no encontrado — catalogo.json vacío');
}

const sizeMB = (fs.statSync(OUT_BASE).size / 1024 / 1024).toFixed(1);
console.log(`\nListo. base_conocimiento.json pesa ${sizeMB} MB.`);
console.log('Para publicar en Vercel, ejecuta desde panel_vercel/:');
console.log('  npx vercel --prod\n');
