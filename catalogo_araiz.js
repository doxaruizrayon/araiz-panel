/**
 * catalogo_araiz.js
 * Extrae TODOS los artículos de TODAS las familias del catálogo de Araiz.
 *
 * Estrategia: re-navega desde BASE_URL en cada iteración para evitar
 * detached DOM elements de Angular (la URL nunca cambia en esta SPA).
 *
 * Soporta checkpoint: si se interrumpe, retoma desde donde lo dejó.
 * Checkpoint: catalogo_checkpoint.json  →  { fi, si, gi }
 * Salida:     catalogo_completo.json
 *
 * Estructura: N1 Familia → N2 Subfamilia → N3 Grupo → N4 Artículos
 * Selectores:
 *   N1     → .card con .row.align-items-center → h5.card-title.mb-0
 *   N2/N3  → .row.card-container .card con .col.ms-n2 → h5.card-title.mb-0
 *            (se usa .row.card-container para excluir el sidebar)
 *   Nombre → .card a.cursor-pointer (texto mixto)
 *   Marca  → .card a.cursor-pointer (TODO MAYÚSCULAS)
 *   Código → .card dd
 */

const puppeteer = require('puppeteer');
const fs        = require('fs');
const path      = require('path');

const BASE_URL        = 'https://www.araiz.com/catalog/list';
const OUTPUT_DIR      = 'C:/PROYECTOS IA/ARAIZ';
const OUTPUT          = path.join(OUTPUT_DIR, 'catalogo_completo.json');
const CHECKPOINT_FILE = path.join(OUTPUT_DIR, 'catalogo_checkpoint.json');
const T_IDLE          = 800;
const T_EXTRA         = 2000;

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Checkpoint ────────────────────────────────────────────────────────────────

function leerCheckpoint() {
  try {
    return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
  } catch (_) {
    return { fi: 0, si: 0, gi: 0 };
  }
}

function guardarCheckpoint(fi, si, gi) {
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify({ fi, si, gi }, null, 2), 'utf8');
}

function leerResultados() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
  } catch (_) {
    return [];
  }
}

// ── Helpers de navegación ─────────────────────────────────────────────────────

async function waitAngular(page) {
  try { await page.waitForNetworkIdle({ timeout: 8000, idleTime: T_IDLE }); } catch (_) {}
  await sleep(T_EXTRA);
}

async function resetToBase(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(T_EXTRA);
}

async function cerrarCookies(page) {
  await page.evaluate(() => {
    for (const btn of document.querySelectorAll('button, a')) {
      const t = btn.textContent.trim().toLowerCase();
      if (t === 'entendido' || t === 'aceptar') { btn.click(); return; }
    }
  });
  await sleep(300);
}

// ── Helpers de lectura de tarjetas ───────────────────────────────────────────

async function getN1Names(page) {
  await page.waitForSelector('.row.align-items-center h5.card-title.mb-0', { timeout: 15000 });
  return page.evaluate(() =>
    [...document.querySelectorAll('.card')]
      .filter(c => c.querySelector('.row.align-items-center'))
      .map(c => c.querySelector('h5.card-title.mb-0')?.textContent.trim())
      .filter(Boolean)
  );
}

async function clickN1(page, idx) {
  await page.waitForSelector('.row.align-items-center h5.card-title.mb-0', { timeout: 15000 });
  await page.evaluate((i) => {
    const cards = [...document.querySelectorAll('.card')]
      .filter(c => c.querySelector('.row.align-items-center'));
    const card = cards[i];
    if (!card) return;
    (card.tagName === 'A' ? card : card.querySelector('a') ?? card).click();
  }, idx);
}

async function getN23Names(page) {
  try {
    await page.waitForSelector('.row.card-container .col.ms-n2 h5.card-title.mb-0', { timeout: 12000 });
  } catch (_) { return []; }
  return page.evaluate(() =>
    [...document.querySelectorAll('.row.card-container .card')]
      .filter(c => c.querySelector('.col.ms-n2'))
      .map(c => c.querySelector('.col.ms-n2 h5.card-title.mb-0')?.textContent.trim())
      .filter(Boolean)
  );
}

async function clickN23(page, idx) {
  try {
    await page.waitForSelector('.row.card-container .col.ms-n2 h5.card-title.mb-0', { timeout: 12000 });
  } catch (_) {}
  await page.evaluate((i) => {
    const cards = [...document.querySelectorAll('.row.card-container .card')]
      .filter(c => c.querySelector('.col.ms-n2'));
    const card = cards[i];
    if (!card) return;
    (card.tagName === 'A' ? card : card.querySelector('a') ?? card).click();
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
    if (!activo) return false;
    let sib = activo.nextElementSibling;
    while (sib) {
      if (sib.classList.contains('page-item') && !sib.classList.contains('disabled')) {
        const link = sib.querySelector('a.page-link');
        if (link?.href) return link.href;
      }
      sib = sib.nextElementSibling;
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
  // Cargar estado previo
  const checkpoint  = leerCheckpoint();
  const resultados  = leerResultados();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  page.on('requestfailed', () => {});

  try {
    console.log('══════════════════════════════════════════════════');
    console.log(' Extracción catálogo Araiz — TODAS las familias');
    if (resultados.length > 0) {
      console.log(` Retomando desde checkpoint: fi=${checkpoint.fi} si=${checkpoint.si} gi=${checkpoint.gi}`);
      console.log(` Artículos ya guardados: ${resultados.length}`);
    }
    console.log('══════════════════════════════════════════════════\n');

    // ── Paso 1: obtener lista de familias ────────────────────────────────────
    await resetToBase(page);
    await cerrarCookies(page);
    const familiaNames = await getN1Names(page);
    console.log(`Familias encontradas (${familiaNames.length}):`);
    familiaNames.forEach((f, i) => console.log(`  [${i}] ${i < checkpoint.fi ? '✓' : ' '} ${f}`));
    console.log('');

    // ── Paso 2: bucle familias ───────────────────────────────────────────────
    for (let fi = checkpoint.fi; fi < familiaNames.length; fi++) {
      const familiaName = familiaNames[fi];
      console.log(`\n[FAMILIA ${fi + 1}/${familiaNames.length}] "${familiaName}"`);

      let subfamiliaNames = [];
      try {
        await resetToBase(page);
        await clickN1(page, fi);
        await waitAngular(page);
        subfamiliaNames = await getN23Names(page);
      } catch (e) {
        console.error(`  ERROR obteniendo subfamilias: ${e.message}`);
        continue;
      }

      console.log(`  → ${subfamiliaNames.length} subfamilias`);

      // Índice de inicio de subfamilia: solo aplica en la familia del checkpoint
      const siInicio = (fi === checkpoint.fi) ? checkpoint.si : 0;

      // ── Paso 3: bucle subfamilias ──────────────────────────────────────────
      for (let si = siInicio; si < subfamiliaNames.length; si++) {
        const subfamiliaName = subfamiliaNames[si];
        console.log(`\n  [SUBFAMILIA ${si + 1}/${subfamiliaNames.length}] "${subfamiliaName}"`);

        let grupoNames = [];
        try {
          await resetToBase(page);
          await clickN1(page, fi);
          await waitAngular(page);
          await clickN23(page, si);
          await waitAngular(page);
          grupoNames = await getN23Names(page);
        } catch (e) {
          console.error(`    ERROR obteniendo grupos: ${e.message}`);
          continue;
        }

        console.log(`    → ${grupoNames.length} grupos`);

        // Índice de inicio de grupo: solo aplica en la subfamilia del checkpoint
        const giInicio = (fi === checkpoint.fi && si === checkpoint.si) ? checkpoint.gi : 0;

        // ── Paso 4: bucle grupos ─────────────────────────────────────────────
        for (let gi = giInicio; gi < grupoNames.length; gi++) {
          const grupoName = grupoNames[gi];
          process.stdout.write(`    [GRUPO ${gi + 1}/${grupoNames.length}] "${grupoName}"\n`);

          try {
            await resetToBase(page);
            await clickN1(page, fi);
            await waitAngular(page);
            await clickN23(page, si);
            await waitAngular(page);
            await clickN23(page, gi);
            await waitAngular(page);
            await cerrarCookies(page);

            await page.waitForSelector('.card a.cursor-pointer', { timeout: 12000 });
            const articulos = await extraerTodosLosArticulos(page);
            console.log(`        → ${articulos.length} artículos extraídos`);

            for (const art of articulos) {
              resultados.push({ familia: familiaName, subfamilia: subfamiliaName, grupo: grupoName, ...art });
            }

            // Guardar resultados y checkpoint tras cada grupo
            fs.writeFileSync(OUTPUT, JSON.stringify(resultados, null, 2), 'utf8');
            guardarCheckpoint(fi, si, gi + 1);

          } catch (e) {
            console.error(`        ERROR: ${e.message}`);
            guardarCheckpoint(fi, si, gi);
            try { await page.screenshot({ path: path.join(OUTPUT_DIR, `error_f${fi}_s${si}_g${gi}.png`) }); } catch (_) {}
          }
        }
      }
    }

    // ── Completado: borrar checkpoint ────────────────────────────────────────
    fs.writeFileSync(OUTPUT, JSON.stringify(resultados, null, 2), 'utf8');
    try { fs.unlinkSync(CHECKPOINT_FILE); } catch (_) {}

    console.log('\n══════════════════════════════════════════════════');
    console.log(` COMPLETADO: ${resultados.length} artículos guardados`);
    console.log(` Archivo: ${OUTPUT}`);
    console.log('══════════════════════════════════════════════════');

  } catch (eCritico) {
    console.error('\nERROR CRÍTICO:', eCritico.message);
    guardarCheckpoint(0, 0, 0);
    try { await page.screenshot({ path: path.join(OUTPUT_DIR, 'error_critico.png') }); } catch (_) {}
  } finally {
    if (resultados.length > 0) {
      fs.writeFileSync(OUTPUT, JSON.stringify(resultados, null, 2), 'utf8');
    }
    await browser.close();
  }
})();
