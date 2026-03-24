/**
 * catalogo_araiz.js
 * Prueba en línea recta: Familia 1 > Subfamilia 1 > Grupo 1 > primer Artículo.
 * Extrae: nombre, marca y código de fabricante.
 *
 * Selectores estables (sin _ngcontent):
 *   N1 Familia     → .card con .row.align-items-center  → h5.card-title.mb-0
 *   N2 Subfamilia  → .card con .col.ms-n2               → h5.card-title.mb-0
 *   N3 Grupo       → .card con .col.ms-n2               → h5.card-title.mb-0
 *   N4 Nombre      → .card a.cursor-pointer  (texto mixto, no todo mayúsculas)
 *   N4 Marca       → .card a.cursor-pointer  (texto TODO MAYÚSCULAS)
 *   N4 Cód.fabric. → .card dd               (primer <dd> del card)
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.araiz.com/catalog/list';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitAngular(page) {
  try { await page.waitForNetworkIdle({ timeout: 8000, idleTime: 800 }); } catch (_) {}
  await sleep(2000);
}

// ── Clic en el primer card de Nivel 1 (Familia) ───────────────────────────────
async function clickPrimeraNivel1(page) {
  return page.evaluate(() => {
    for (const card of document.querySelectorAll('.card')) {
      if (!card.querySelector('.row.align-items-center')) continue;
      const h5 = card.querySelector('h5.card-title.mb-0');
      if (!h5) continue;
      const nombre = h5.textContent.trim();
      const link = card.tagName === 'A' ? card : card.querySelector('a');
      if (link) link.click(); else card.click();
      return nombre;
    }
    return null;
  });
}

// ── Clic en el primer card de Nivel 2/3 (Subfamilia / Grupo) ─────────────────
async function clickPrimeraNivel23(page) {
  return page.evaluate(() => {
    for (const card of document.querySelectorAll('.card')) {
      const msDiv = card.querySelector('.col.ms-n2');
      if (!msDiv) continue;
      const h5 = msDiv.querySelector('h5.card-title.mb-0');
      if (!h5) continue;
      const nombre = h5.textContent.trim();
      const link = card.tagName === 'A' ? card : card.querySelector('a');
      if (link) link.click(); else card.click();
      return nombre;
    }
    return null;
  });
}

// ── Extrae nombre, marca y código del primer artículo visible ─────────────────
async function extraerPrimerArticulo(page) {
  return page.evaluate(() => {
    const cards = document.querySelectorAll('.card');
    for (const card of cards) {
      // Nombre: primer a.cursor-pointer con texto mixto (no todo mayúsculas)
      let nombre = null;
      for (const a of card.querySelectorAll('a.cursor-pointer')) {
        const txt = a.textContent.trim();
        if (txt.length >= 5 && txt !== txt.toUpperCase()) { nombre = txt; break; }
      }
      if (!nombre) continue; // si no tiene nombre de producto, es otro tipo de card

      // Marca: primer a.cursor-pointer con texto TODO MAYÚSCULAS
      let marca = null;
      for (const a of card.querySelectorAll('a.cursor-pointer')) {
        const txt = a.textContent.trim();
        if (txt.length >= 2 && txt === txt.toUpperCase()) { marca = txt; break; }
      }

      // Código fabricante: primer <dd> del card
      const dd = card.querySelector('dd');
      const codigoFabricante = dd ? dd.textContent.trim() : null;

      return { nombre, marca, codigoFabricante };
    }
    return null;
  });
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    // ── NIVEL 1: Familia ─────────────────────────────────────────────────────
    console.log('Navegando al catálogo...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 40000 });
    await sleep(2000);

    await page.waitForSelector('.row.align-items-center h5.card-title.mb-0', { timeout: 15000 });
    const familia = await clickPrimeraNivel1(page);
    if (!familia) throw new Error('No se encontró Familia');
    console.log(`  N1 → "${familia}"`);
    await waitAngular(page);

    // ── NIVEL 2: Subfamilia ──────────────────────────────────────────────────
    await page.waitForSelector('.col.ms-n2 h5.card-title.mb-0', { timeout: 12000 });
    const subfamilia = await clickPrimeraNivel23(page);
    if (!subfamilia) throw new Error('No se encontró Subfamilia');
    console.log(`  N2 → "${subfamilia}"`);
    await waitAngular(page);

    // ── NIVEL 3: Grupo ───────────────────────────────────────────────────────
    await page.waitForSelector('.col.ms-n2 h5.card-title.mb-0', { timeout: 12000 });
    const grupo = await clickPrimeraNivel23(page);
    if (!grupo) throw new Error('No se encontró Grupo');
    console.log(`  N3 → "${grupo}"`);
    await waitAngular(page);
    await sleep(2000); // Angular tarda más en renderizar el listado de productos

    // ── Cerrar banner cookies si aparece ─────────────────────────────────────
    await page.evaluate(() => {
      for (const btn of document.querySelectorAll('button, a')) {
        const t = btn.textContent.trim().toLowerCase();
        if (t === 'entendido' || t === 'aceptar') { btn.click(); return; }
      }
    });
    await sleep(500);

    // ── NIVEL 4: Artículo ────────────────────────────────────────────────────
    await page.waitForSelector('.card a.cursor-pointer', { timeout: 15000 });
    const articulo = await extraerPrimerArticulo(page);
    if (!articulo) throw new Error('No se encontró Artículo');

    // ── RESULTADO ─────────────────────────────────────────────────────────────
    const resultado = {
      familia,
      subfamilia,
      grupo,
      articulo:          articulo.nombre,
      marca:             articulo.marca,
      codigoFabricante:  articulo.codigoFabricante,
    };

    console.log('\nResultado:');
    console.log(JSON.stringify(resultado, null, 2));

  } catch (err) {
    console.error('\nERROR:', err.message);
    try { await page.screenshot({ path: 'C:/PROYECTOS/ARAIZ/debug_error.png' }); } catch (_) {}
  } finally {
    await browser.close();
  }
})();
