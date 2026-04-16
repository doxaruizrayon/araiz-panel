/**
 * PANEL DE CONOCIMIENTO ARAIZ
 * Servidor local — Puerto 5192
 * Acceso: http://localhost:5192
 *
 * Sirve los archivos de panel_vercel/ directamente.
 * Antes de arrancar regenera los JSON para que estén al día.
 * Expone /api/catalogo?q=... para buscar en el catálogo completo (354k artículos).
 */

const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const { execSync } = require('child_process');

const PORT      = 5192;
const PANEL_DIR = path.join(__dirname, 'panel_vercel');
const FULL_CAT  = path.join(__dirname, 'panel_vercel', 'catalogo_full.json');

// Regenerar JSONs automáticamente al arrancar
console.log('Actualizando base de conocimiento...');
try {
  execSync('node panel_vercel/generar.js', { cwd: __dirname, stdio: 'inherit' });
} catch (e) {
  console.error('Error al generar JSONs:', e.message);
}

// Cargar catálogo completo en memoria (86MB, ~3s)
let CATALOGO = [];
if (fs.existsSync(FULL_CAT)) {
  console.log('Cargando catálogo completo en memoria...');
  try {
    CATALOGO = JSON.parse(fs.readFileSync(FULL_CAT, 'utf8'));
    console.log(`Catálogo listo: ${CATALOGO.length.toLocaleString()} artículos`);
  } catch (e) {
    console.error('Error cargando catálogo:', e.message);
  }
} else {
  console.log('catalogo_full.json no encontrado — búsqueda de catálogo no disponible');
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

function normalize(s) {
  return (s || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const urlObj   = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = urlObj.pathname;

  // ── API: búsqueda en catálogo completo ──────────────────────────────────
  if (pathname === '/api/catalogo') {
    const q      = normalize(urlObj.searchParams.get('q') || '');
    const familia = normalize(urlObj.searchParams.get('f') || '');
    const marca   = normalize(urlObj.searchParams.get('m') || '');
    const limite  = Math.min(parseInt(urlObj.searchParams.get('limit') || '50'), 200);

    if (!q && !familia && !marca) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Parámetro q requerido' }));
      return;
    }

    const qTokens = q.split(/\s+/).filter(Boolean);

    const resultados = [];
    for (const art of CATALOGO) {
      if (resultados.length >= limite) break;

      const texto = normalize(art.n + ' ' + art.cf + ' ' + art.c + ' ' + art.m);

      // Filtros
      if (familia && !normalize(art.f + ' ' + art.s).includes(familia)) continue;
      if (marca   && !normalize(art.m).includes(marca)) continue;
      if (qTokens.length && !qTokens.every(t => texto.includes(t))) continue;

      resultados.push(art);
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ total: resultados.length, resultados }));
    return;
  }

  // ── Archivos estáticos de panel_vercel/ ─────────────────────────────────
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(PANEL_DIR, filePath);

  // Seguridad: no salir de panel_vercel/
  if (!filePath.startsWith(PANEL_DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const ext  = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\nPanel listo en http://localhost:${PORT}`);
  console.log(`Catálogo completo: http://localhost:${PORT}/api/catalogo?q=legrand\n`);
});
