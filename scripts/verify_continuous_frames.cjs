const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const STRIPS_DIR = '/Users/sarmilabanus/.gemini/antigravity/brain/6da5c660-77f8-410b-bddc-6adb1b6b4806/framestrips';
const DIST_DIR = path.resolve(__dirname, '../dist');

if (!fs.existsSync(STRIPS_DIR)) fs.mkdirSync(STRIPS_DIR, { recursive: true });

const MIME = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json'
};

async function setupRouting(page) {
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    let pathname = url.pathname;
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(DIST_DIR, pathname);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      route.fulfill({
        status: 200,
        contentType: MIME[path.extname(filePath)] || 'application/octet-stream',
        body: fs.readFileSync(filePath)
      });
    } else {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: fs.readFileSync(path.join(DIST_DIR, 'index.html'))
      });
    }
  });
}

// Function to measure viewport uniformity
async function getViewportUniformity(page) {
  return await page.evaluate(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const samples = [];
    const colorCounts = {};
    let total = 0;

    // Sample a 10x10 grid of points across the viewport
    for (let x = w * 0.05; x < w; x += w * 0.1) {
      for (let y = h * 0.05; y < h; y += h * 0.1) {
        total++;
        const el = document.elementFromPoint(x, y);
        if (!el) continue;
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        const color = style.color;
        const key = `${bg}|${color}|${el.tagName}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
      }
    }

    let maxCount = 0;
    for (const count of Object.values(colorCounts)) {
      if (count > maxCount) maxCount = count;
    }

    return total > 0 ? maxCount / total : 0;
  });
}

async function verifyContinuousTransitions() {
  console.log('=== VERIFYING CONTINUOUS TRANSITIONS (FLAT FRAME LIMIT: 150ms) ===');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await setupRouting(page);

  // -------------------------------------------------------------
  // TEST 1: Route Change: Home (/) -> Features (/features) (Circle Iris)
  // -------------------------------------------------------------
  console.log('\nTesting Route Change: Home -> Features (Circle Iris)...');
  await page.goto('http://app.local/');
  await page.waitForTimeout(600);

  const route1Dir = path.join(STRIPS_DIR, 'route-home-to-features');
  if (!fs.existsSync(route1Dir)) fs.mkdirSync(route1Dir, { recursive: true });

  const navFeaturesLink = page.locator('a[href="/features"]').first();
  await navFeaturesLink.click();

  const startRoute1 = Date.now();
  let consecutiveFlatMs = 0;
  let maxFlatMsRoute1 = 0;
  let lastTime = startRoute1;

  while (Date.now() - startRoute1 < 1000) {
    const now = Date.now();
    const elapsed = now - startRoute1;
    const delta = now - lastTime;
    lastTime = now;

    const ratio = await getViewportUniformity(page);
    const isFlat = ratio > 0.85;

    if (isFlat) {
      consecutiveFlatMs += delta;
      if (consecutiveFlatMs > maxFlatMsRoute1) maxFlatMsRoute1 = consecutiveFlatMs;
    } else {
      consecutiveFlatMs = 0;
    }

    // Save frame every ~100ms
    if (elapsed % 100 < 50) {
      await page.screenshot({ path: path.join(route1Dir, `frame-${String(Math.round(elapsed / 100) * 100).padStart(4, '0')}ms.png`) });
    }
    await page.waitForTimeout(40);
  }

  console.log(`[PASS CHECK] Home -> Features Max Flat Duration: ${maxFlatMsRoute1}ms (Must be <= 150ms)`);
  if (maxFlatMsRoute1 > 150) {
    throw new Error(`FAIL: Flat frame duration of ${maxFlatMsRoute1}ms exceeded 150ms during Home -> Features!`);
  }

  // -------------------------------------------------------------
  // TEST 2: Route Change: Features (/features) -> Home (/) (Curved Sheet)
  // -------------------------------------------------------------
  console.log('\nTesting Route Change: Features -> Home (Curved Sheet)...');
  const route2Dir = path.join(STRIPS_DIR, 'route-features-to-home');
  if (!fs.existsSync(route2Dir)) fs.mkdirSync(route2Dir, { recursive: true });

  const homeLogoLink = page.locator('header a[href="/"]').first();
  await homeLogoLink.click();

  const startRoute2 = Date.now();
  consecutiveFlatMs = 0;
  let maxFlatMsRoute2 = 0;
  lastTime = startRoute2;

  while (Date.now() - startRoute2 < 1000) {
    const now = Date.now();
    const elapsed = now - startRoute2;
    const delta = now - lastTime;
    lastTime = now;

    const ratio = await getViewportUniformity(page);
    const isFlat = ratio > 0.85;

    if (isFlat) {
      consecutiveFlatMs += delta;
      if (consecutiveFlatMs > maxFlatMsRoute2) maxFlatMsRoute2 = consecutiveFlatMs;
    } else {
      consecutiveFlatMs = 0;
    }

    if (elapsed % 100 < 50) {
      await page.screenshot({ path: path.join(route2Dir, `frame-${String(Math.round(elapsed / 100) * 100).padStart(4, '0')}ms.png`) });
    }
    await page.waitForTimeout(40);
  }

  console.log(`[PASS CHECK] Features -> Home Max Flat Duration: ${maxFlatMsRoute2}ms (Must be <= 150ms)`);
  if (maxFlatMsRoute2 > 150) {
    throw new Error(`FAIL: Flat frame duration of ${maxFlatMsRoute2}ms exceeded 150ms during Features -> Home!`);
  }

  // -------------------------------------------------------------
  // TEST 3: Scroll Transition: Hero -> Macros (Circle Iris)
  // -------------------------------------------------------------
  console.log('\nTesting Scroll Transition: Hero -> Macros (Circle Iris)...');
  await page.goto('http://app.local/');
  await page.waitForTimeout(600);

  const scroll1Dir = path.join(STRIPS_DIR, 'scroll-hero-to-macros');
  if (!fs.existsSync(scroll1Dir)) fs.mkdirSync(scroll1Dir, { recursive: true });

  let maxFlatMsScroll1 = 0;
  consecutiveFlatMs = 0;

  for (let y = 0; y <= 900; y += 90) {
    const t0 = Date.now();
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(40);

    const ratio = await getViewportUniformity(page);
    const isFlat = ratio > 0.85;
    const delta = Date.now() - t0;

    if (isFlat) {
      consecutiveFlatMs += delta;
      if (consecutiveFlatMs > maxFlatMsScroll1) maxFlatMsScroll1 = consecutiveFlatMs;
    } else {
      consecutiveFlatMs = 0;
    }

    await page.screenshot({ path: path.join(scroll1Dir, `frame-scroll-${String(y).padStart(4, '0')}px.png`) });
  }

  console.log(`[PASS CHECK] Hero -> Macros Scroll Max Flat Duration: ${maxFlatMsScroll1}ms (Must be <= 150ms)`);
  if (maxFlatMsScroll1 > 150) {
    throw new Error(`FAIL: Flat frame duration of ${maxFlatMsScroll1}ms exceeded 150ms during Hero -> Macros!`);
  }

  // -------------------------------------------------------------
  // TEST 4: Scroll Transition: Macros -> Home Food (Curved Sheet)
  // -------------------------------------------------------------
  console.log('\nTesting Scroll Transition: Macros -> Home Food (Curved Sheet)...');
  const scroll2Dir = path.join(STRIPS_DIR, 'scroll-macros-to-homefood');
  if (!fs.existsSync(scroll2Dir)) fs.mkdirSync(scroll2Dir, { recursive: true });

  let maxFlatMsScroll2 = 0;
  consecutiveFlatMs = 0;

  for (let y = 900; y <= 1800; y += 90) {
    const t0 = Date.now();
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(40);

    const ratio = await getViewportUniformity(page);
    const isFlat = ratio > 0.85;
    const delta = Date.now() - t0;

    if (isFlat) {
      consecutiveFlatMs += delta;
      if (consecutiveFlatMs > maxFlatMsScroll2) maxFlatMsScroll2 = consecutiveFlatMs;
    } else {
      consecutiveFlatMs = 0;
    }

    await page.screenshot({ path: path.join(scroll2Dir, `frame-scroll-${String(y).padStart(4, '0')}px.png`) });
  }

  console.log(`[PASS CHECK] Macros -> Home Food Scroll Max Flat Duration: ${maxFlatMsScroll2}ms (Must be <= 150ms)`);
  if (maxFlatMsScroll2 > 150) {
    throw new Error(`FAIL: Flat frame duration of ${maxFlatMsScroll2}ms exceeded 150ms during Macros -> Home Food!`);
  }

  await browser.close();

  console.log('\n======================================================');
  console.log('ALL TRANSITION CONTINUITY CHECKS PASSED: ZERO BLANKS > 150ms');
  console.log('Frame strips saved in:', STRIPS_DIR);
  console.log('======================================================');
}

verifyContinuousTransitions().catch((err) => {
  console.error(err);
  process.exit(1);
});

