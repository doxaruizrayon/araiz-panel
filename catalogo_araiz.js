/**
 * catalogo_araiz.js
 * Extrae TODOS los artículos de la familia "Electricidad" del catálogo de Araiz.
 *
 * Estrategia: re-navega desde BASE_URL en cada iteración para evitar
 * detached DOM elements de Angular (la URL nunca cambia en esta SPA).
 *
 * Estructura: N1 Familia → N2 Subfamilia → N3 Grupo → N4 Artículos
 * Selectores:
 *   N1 → .card con .row.align-items-center → h5.card-title.mb-0
 *   N2/N3 → .card con .col.ms-n2 → h5.card-title.mb-0
 *   Nombre → .card a.cursor-pointer (texto mixto)
 *   Marca  → .card a.cursor-pointer (TODO MAYÚSCULAS)
 *   Código → .card dd
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE_URL = 'https://www.araiz.com/catalog/list';
const OUTPUT   = 'C:/PROYECTOS/ARAIZ/electricidad_completa.json';
const T_IDLE   = 800;   // ms de red idle para waitForNetworkIdle
const T_EXTRA  = 2000;  // pausa extra tras cada clic Angular

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Helpers de navegación ─────────────────────────────────────────────────────

async function waitAngular(page) {
  try { await page.waitForNetworkIdle({ timeout: 8000, idleTime: T_IDLE }); } catch (_) {}
  await sleep(T_EXTRA);
}

async function resetToBase(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(T_EXTRA);
}

/** Hace clic en la tarjeta N1 (Familia) de índice idx. Devuelve el nombre. */
async function clickN1(page, idx) {
  await page.waitForSelector('.row.align-items-center h5.card-title.mb-0', { timeout: 15000 });
  return page.evaluate((i) => {
    const cards = [...document.querySelectorAll('.card')]
      .filter(c => c.querySelector('.row.align-items-center'));
    const card = cards[i];
    if (!card) return null;
    const nombre = card.querySelector('h5.card-title.mb-0')?.textContent.trim() ?? null;
    (card.tagName === 'A' ? card : card.querySelector('a') ?? card).click();
    return nombre;
  }, idx);
}

/** Devuelve los nombres de todas las tarjetas N2/N3 visibles (.col.ms-n2). */
async function getN23Names(page) {
  try {
    await page.waitForSelector('.col.ms-n2 h5.card-title.mb-0', { timeout: 12000 });
  } catch (_) { return []; }
  return page.evaluate(() =>
    [...document.querySelectorAll('.card')]
      .filter(c => c.querySelector('.col.ms-n2'))
      .map(c => c.querySelector('.col.ms-n2 h5.card-title.mb-0')?.textContent.trim())
      .filter(Boolean)
  );
}

/** Hace clic en la tarjeta N2/N3 de índice idx. Devuelve el nombre. */
async function clickN23(page, idx) {
  try {
    await page.waitForSelector('.col.ms-n2 h5.card-title.mb-0', { timeout: 12000 });
  } catch (_) {}
  return page.evaluate((i) => {
    const cards = [...document.querySelectorAll('.card')]
      .filter(c => c.querySelector('.col.ms-n2'));
    const card = cards[i];
    if (!card) return null;
    const nombre = card.querySelector('.col.ms-n2 h5.card-title.mb-0')?.textContent.trim() ?? null;
    (card.tagName === 'A' ? card : card.querySelector('a') ?? card).click();
    return nombre;
  }, idx);
}

// ── Extracción de artículos (N4) ──────────────────────────────────────────────

async function extraerArticulosDePagina(page) {
  return page.evaluate(() => {
    const resultado = [];
    for (const card of document.querySelectorAll('.card')) {
      let nombre = null;
      for (const a of card.querySelectorAll('a.cursor-pointer')) {
        const txt = a.textContent.trim();
        if (txt.length >= 5 && txt !== txt.toUpperCase()) { nombre = txt; break; }
      }
      if (!nombre) continue;

      let marca = null;
      for (const a of card.querySelectorAll('a.cursor-pointer')) {
        const txt = a.textContent.trim();
        if (txt.length >= 2 && txt === txt.toUpperCase()) { marca = txt; break; }
      }

      const dd = card.querySelector('dd');
      const codigoFabricante = dd ? dd.textContent.trim() : null;

      resultado.push({ nombre, marca, codigoFabricante });
    }
    return resultado;
  });
}

async function hayPaginaSiguiente(page) {
  return page.evaluate(() => {
    const activo = document.querySelector('li.page-item.active');
    if (activo) {
      let sib = activo.nextElementSibling;
      while (sib) {
        if (sib.classList.contains('page-item') && !sib.classList.contains('disabled')) {
          const link = sib.querySelector('a.page-link');
          if (link?.href) return link.href;
        }
        sib = sib.nextElementSibling;
      }
    }
    return false;
  });
}

async function extraerTodosLosArticulos(page) {
  const todos = [];
  let pagina = 1;
  while (true) {
    const arts = await extraerArticulosDePagina(page);
    todos.push(...arts);
    process.stdout.write(`\r        Página ${pagina} — ${todos.length} artículos`);
    const nextUrl = await hayPaginaSiguiente(page);
    if (!nextUrl) break;
    await page.goto(nextUrl, { waitUntil: 'networkidle2', timeout: 40000 });
    await sleep(T_EXTRA);
    pagina++;
  }
  process.stdout.write('\n');
  return todos;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  page.on('requestfailed', () => {});

  const resultados = [];

  try {
    console.log('══════════════════════════════════════════════════');
    console.log(' Extracción catálogo Araiz — Familia: Electricidad');
    console.log('══════════════════════════════════════════════════\n');

    // ── Obtener nombre de familia y lista de subfamilias ─────────────────────
    await resetToBase(page);
    const familiaName = await clickN1(page, 0);
    await waitAngular(page);
    const subfamiliaNames = await getN23Names(page);

    console.log(`[FAMILIA] "${familiaName}"`);
    console.log(`  → ${subfamiliaNames.length} subfamilias\n`);

    // ── Bucle subfamilias ────────────────────────────────────────────────────
    for (let si = 0; si < subfamiliaNames.length; si++) {
      const subfamiliaName = subfamiliaNames[si];
      console.log(`  [SUBFAMILIA ${si + 1}/${subfamiliaNames.length}] "${subfamiliaName}"`);

      let grupoNames = [];
      try {
        // Navegar: BASE → N1 → N2[si]
        await resetToBase(page);
        await clickN1(page, 0);
        await waitAngular(page);
        await clickN23(page, si);
        await waitAngular(page);
        grupoNames = await getN23Names(page);
      } catch (e) {
        console.error(`    ERROR obteniendo grupos: ${e.message}`);
        continue;
      }

      console.log(`    → ${grupoNames.length} grupos`);

      // ── Bucle grupos ───────────────────────────────────────────────────────
      for (let gi = 0; gi < grupoNames.length; gi++) {
        const grupoName = grupoNames[gi];
        process.stdout.write(`    [GRUPO ${gi + 1}/${grupoNames.length}] "${grupoName}"\n`);

        try {
          // Navegar: BASE → N1 → N2[si] → N3[gi]
          await resetToBase(page);
          await clickN1(page, 0);
          await waitAngular(page);
          await clickN23(page, si);
          await waitAngular(page);
          await clickN23(page, gi);
          await waitAngular(page);
          await sleep(2000); // Angular tarda más en renderizar el listado

          // Cerrar banner de cookies si aparece
          await page.evaluate(() => {
            for (const btn of document.querySelectorAll('button, a')) {
              const t = btn.textContent.trim().toLowerCase();
              if (t === 'entendido' || t === 'aceptar') { btn.click(); return; }
            }
          });
          await sleep(300);

          // Extraer artículos
          await page.waitForSelector('.card a.cursor-pointer', { timeout: 12000 });
          const articulos = await extraerTodosLosArticulos(page);
          console.log(`        → ${articulos.length} artículos extraídos`);

          for (const art of articulos) {
            resultados.push({ familia: familiaName, subfamilia: subfamiliaName, grupo: grupoName, ...art });
          }

          // Guardado parcial cada 50 artículos
          if (resultados.length % 50 < articulos.length || articulos.length === 0) {
            fs.writeFileSync(OUTPUT, JSON.stringify(resultados, null, 2), 'utf8');
          }

        } catch (e) {
          console.error(`        ERROR: ${e.message}`);
        }
      }

      console.log('');
    }

    // ── Guardado final ───────────────────────────────────────────────────────
    fs.writeFileSync(OUTPUT, JSON.stringify(resultados, null, 2), 'utf8');
    console.log('══════════════════════════════════════════════════');
    console.log(` COMPLETADO: ${resultados.length} artículos guardados`);
    console.log(` Archivo: ${OUTPUT}`);
    console.log('══════════════════════════════════════════════════');

  } catch (eCritico) {
    console.error('\nERROR CRÍTICO:', eCritico.message);
    try { await page.screenshot({ path: 'C:/PROYECTOS/ARAIZ/debug_error.png' }); } catch (_) {}
  } finally {
    if (resultados.length > 0) {
      fs.writeFileSync(OUTPUT, JSON.stringify(resultados, null, 2), 'utf8');
    }
    await browser.close();
  }
})();
