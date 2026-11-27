const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const DIAG_DIR = '/Users/sarmilabanus/.gemini/antigravity/brain/6da5c660-77f8-410b-bddc-6adb1b6b4806/diagnosis';
const DIST_DIR = path.resolve(__dirname, '../dist');

if (!fs.existsSync(DIAG_DIR)) fs.mkdirSync(DIAG_DIR, { recursive: true });

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

// Function to analyze if an image buffer is >80% flat color
// In Node.js without canvas, sample raw PNG bytes or check pixel uniformity
function analyzeFlatness(pngBuffer) {
  // Simple check on byte repetition in PNG or rough sample
  // Better: evaluate directly inside browser page using canvas before taking screenshot
  return true;
}

async function runDiagnosis() {
  console.log('=== RUNNING TRANSITION DIAGNOSIS (every 50ms) ===');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await setupRouting(page);

  await page.goto('http://app.local/');
  await page.waitForTimeout(600);

  // Helper inside browser to measure flat color percentage on current viewport
  const getViewportFlatness = async () => {
    return await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      // Draw document into canvas or sample elements
      // Sample 100 points across the viewport
      const w = window.innerWidth;
      const h = window.innerHeight;
      const colorCounts = {};
      let total = 0;

      for (let x = 10; x < w; x += w / 10) {
        for (let y = 10; y < h; y += h / 10) {
          total++;
          const el = document.elementFromPoint(x, y);
          if (!el) continue;
          const bg = window.getComputedStyle(el).backgroundColor;
          colorCounts[bg] = (colorCounts[bg] || 0) + 1;
        }
      }

      let maxCount = 0;
      let dominantColor = '';
      for (const [col, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          dominantColor = col;
        }
      }

      const ratio = total > 0 ? maxCount / total : 0;
      return { ratio, dominantColor };
    });
  };

  const framesReport = [];

  // --- DIAGNOSIS 1: Route Change Home -> Features ---
  console.log('\nDiagnosing Route Change: Home -> Features...');
  const navLink = page.locator('a[href="/features"]').first();
  await navLink.click();

  const startTime = Date.now();
  let frameIdx = 0;
  while (Date.now() - startTime < 1600) {
    const elapsed = Date.now() - startTime;
    const { ratio, dominantColor } = await getViewportFlatness();
    const isFlat = ratio >= 0.8;
    const filename = `route-frame-${String(frameIdx).padStart(3, '0')}-${elapsed}ms.png`;
    const framePath = path.join(DIAG_DIR, filename);
    await page.screenshot({ path: framePath });

    framesReport.push({
      type: 'route-change',
      elapsed,
      isFlat,
      ratio,
      dominantColor,
      filename
    });

    frameIdx++;
    await page.waitForTimeout(40); // Target ~50ms cadence
  }

  // --- DIAGNOSIS 2: Scroll Transition Hero -> Macros ---
  console.log('\nDiagnosing Scroll Transitions between Sections on Home...');
  await page.goto('http://app.local/');
  await page.waitForTimeout(600);

  const scrollReport = [];
  const scrollStart = Date.now();
  // Scroll 1500px in steps of 60px every 50ms
  for (let s = 0; s < 1800; s += 70) {
    await page.evaluate((top) => window.scrollTo(0, top), s);
    const elapsed = Date.now() - scrollStart;
    const { ratio, dominantColor } = await getViewportFlatness();
    const isFlat = ratio >= 0.8;
    const filename = `scroll-frame-${String(s).padStart(4, '0')}-${elapsed}ms.png`;
    const framePath = path.join(DIAG_DIR, filename);
    await page.screenshot({ path: framePath });

    scrollReport.push({
      type: 'scroll-transition',
      scrollPos: s,
      elapsed,
      isFlat,
      ratio,
      dominantColor,
      filename
    });
    await page.waitForTimeout(45);
  }

  await browser.close();

  // Summary analysis
  const flatRouteFrames = framesReport.filter((f) => f.isFlat);
  const flatScrollFrames = scrollReport.filter((f) => f.isFlat);

  console.log('\n=== DIAGNOSIS SUMMARY ===');
  console.log(`Route Change Total Frames: ${framesReport.length}`);
  console.log(`Route Change Flat Frames (>80% flat color): ${flatRouteFrames.length}`);
  if (flatRouteFrames.length > 0) {
    const minTime = Math.min(...flatRouteFrames.map((f) => f.elapsed));
    const maxTime = Math.max(...flatRouteFrames.map((f) => f.elapsed));
    console.log(`Flat window during route change: ${minTime}ms - ${maxTime}ms (duration: ${maxTime - minTime}ms)`);
    console.log(`Dominant color during flat window: ${flatRouteFrames[0].dominantColor}`);
  }

  console.log(`\nScroll Transitions Total Frames: ${scrollReport.length}`);
  console.log(`Scroll Transitions Flat Frames: ${flatScrollFrames.length}`);
  if (flatScrollFrames.length > 0) {
    console.log(`Scroll positions with flat frames:`, flatScrollFrames.map((f) => `pos=${f.scrollPos}px (ratio=${Math.round(f.ratio * 100)}%)`));
  }

  fs.writeFileSync(
    path.join(DIAG_DIR, 'diagnosis_report.json'),
    JSON.stringify({ framesReport, scrollReport }, null, 2)
  );
  console.log(`\nDiagnosis report saved to: ${path.join(DIAG_DIR, 'diagnosis_report.json')}`);
}

runDiagnosis().catch(console.error);

