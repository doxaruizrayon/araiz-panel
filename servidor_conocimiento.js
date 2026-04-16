/**
 * PANEL DE CONOCIMIENTO ARAIZ
 * Servidor local — Puerto 5192
 * Acceso: http://localhost:5192
 *
 * Sirve los archivos de panel_vercel/ directamente.
 * Antes de arrancar regenera los JSON para que estén al día.
 */

const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const { execSync } = require('child_process');

const PORT       = 5192;
const PANEL_DIR  = path.join(__dirname, 'panel_vercel');

// Regenerar JSONs automáticamente al arrancar
console.log('Actualizando base de conocimiento...');
try {
  execSync('node panel_vercel/generar.js', { cwd: __dirname, stdio: 'inherit' });
} catch (e) {
  console.error('Error al generar JSONs:', e.message);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let pathname = req.url.split('?')[0];
  if (pathname === '/') pathname = '/index.html';

  const filePath = path.join(PANEL_DIR, pathname);

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
  console.log(`\nPanel listo en http://localhost:${PORT}\n`);
});
