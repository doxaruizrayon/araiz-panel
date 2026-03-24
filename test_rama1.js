/**
 * test_rama1.js
 * Prueba en línea recta: Familia 1 > Subfamilia 1 > Grupo 1 > Artículo 1
 * Sin bucles. Solo imprime el resultado por consola.
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.araiz.com/catalog/list';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitNet(page) {
  try { await page.waitForNetworkIdle({ timeout: 8000, idleTime: 500 }); } catch (_) {}
  await sleep(1500);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    // ── PASO 1: Página principal ──────────────────────────────────────────────
    console.log('Navegando a la página principal...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 40000 });
    await sleep(2000);

    // ── PASO 2: NIVEL 1 — Familia ─────────────────────────────────────────────
    // Selector: primera .card que contenga .row.align-items-center con h5.card-title.mb-0
    await page.waitForSelector('.row.align-items-center h5.card-title.mb-0', {
      visible: true, timeout: 15000,
    });

    const familia = await page.evaluate(() => {
      for (const card of document.querySelectorAll('.card')) {
        if (!card.querySelector('.row.align-items-center')) continue;
        const h5 = card.querySelector('h5.card-title.mb-0');
        if (h5) return h5.textContent.trim();
      }
      return null;
    });
    if (!familia) throw new Error('No se encontró ninguna Familia');
    console.log(`  N1 Familia encontrada: "${familia}"`);

    // Clic en la primera tarjeta de familia
    await page.evaluate(() => {
      for (const card of document.querySelectorAll('.card')) {
        if (!card.querySelector('.row.align-items-center')) continue;
        const h5 = card.querySelector('h5.card-title.mb-0');
        if (h5) { card.querySelector('a') ? card.querySelector('a').click() : card.click(); return; }
      }
    });
    await waitNet(page);
    console.log(`  URL tras N1: ${page.url()}`);

    // ── PASO 3: NIVEL 2 — Subfamilia ──────────────────────────────────────────
    // Selector: primera .card que contenga .col.ms-n2 con h5.card-title.mb-0
    await page.waitForSelector('.col.ms-n2 h5.card-title.mb-0', {
      visible: true, timeout: 12000,
    });

    const subfamilia = await page.evaluate(() => {
      for (const card of document.querySelectorAll('.card')) {
        const msDiv = card.querySelector('.col.ms-n2');
        if (!msDiv) continue;
        const h5 = msDiv.querySelector('h5.card-title.mb-0');
        if (h5) return h5.textContent.trim();
      }
      return null;
    });
    if (!subfamilia) throw new Error('No se encontró ninguna Subfamilia');
    console.log(`  N2 Subfamilia encontrada: "${subfamilia}"`);

    await page.evaluate(() => {
      for (const card of document.querySelectorAll('.card')) {
        const msDiv = card.querySelector('.col.ms-n2');
        if (!msDiv) continue;
        const h5 = msDiv.querySelector('h5.card-title.mb-0');
        if (h5) { card.querySelector('a') ? card.querySelector('a').click() : card.click(); return; }
      }
    });
    await waitNet(page);
    console.log(`  URL tras N2: ${page.url()}`);

    // ── PASO 4: NIVEL 3 — Grupo ───────────────────────────────────────────────
    await page.waitForSelector('.col.ms-n2 h5.card-title.mb-0', {
      visible: true, timeout: 12000,
    });

    const grupo = await page.evaluate(() => {
      for (const card of document.querySelectorAll('.card')) {
        const msDiv = card.querySelector('.col.ms-n2');
        if (!msDiv) continue;
        const h5 = msDiv.querySelector('h5.card-title.mb-0');
        if (h5) return h5.textContent.trim();
      }
      return null;
    });
    if (!grupo) throw new Error('No se encontró ningún Grupo');
    console.log(`  N3 Grupo encontrado: "${grupo}"`);

    await page.evaluate(() => {
      for (const card of document.querySelectorAll('.card')) {
        const msDiv = card.querySelector('.col.ms-n2');
        if (!msDiv) continue;
        const h5 = msDiv.querySelector('h5.card-title.mb-0');
        if (h5) { card.querySelector('a') ? card.querySelector('a').click() : card.click(); return; }
      }
    });
    await waitNet(page);
    console.log(`  URL tras N3: ${page.url()}`);

    // ── Cerrar banner de cookies si aparece ──────────────────────────────────
    try {
      await page.evaluate(() => {
        for (const btn of document.querySelectorAll('button, a')) {
          if (btn.textContent.trim().toLowerCase().includes('entendido') ||
              btn.textContent.trim().toLowerCase().includes('aceptar')) {
            btn.click(); return;
          }
        }
      });
      await sleep(500);
    } catch (_) {}

    // ── PASO 5: NIVEL 4 — diagnóstico de selectores disponibles ─────────────
    await sleep(4000); // dar más tiempo a Angular

    // Mostrar los primeros 5 a.cursor-pointer para elegir el correcto
    const muestras = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a.cursor-pointer'))
        .slice(0, 5)
        .map(a => a.textContent.trim())
    );
    console.log('  Primeros 5 a.cursor-pointer:', muestras);

    // Primer artículo real: dentro de .card, texto mixto (no todo mayúsculas = no es marca)
    const articulo = await page.evaluate(() => {
      for (const a of document.querySelectorAll('.card a.cursor-pointer')) {
        const txt = a.textContent.trim();
        if (txt.length >= 5 && txt !== txt.toUpperCase()) return txt;
      }
      return null;
    });
    if (!articulo) throw new Error('No se encontró ningún Artículo');
    console.log(`  N4 Artículo encontrado: "${articulo}"`);

    // ── RESULTADO ─────────────────────────────────────────────────────────────
    console.log('');
    console.log(`ÉXITO: ${familia} > ${subfamilia} > ${grupo} > ${articulo}`);

  } catch (err) {
    console.error('ERROR:', err.message);
    try { await page.screenshot({ path: 'C:/PROYECTOS/ARAIZ/debug_error.png' }); } catch (_) {}
    console.log('Captura guardada en debug_error.png');
  } finally {
    await browser.close();
  }
})();
