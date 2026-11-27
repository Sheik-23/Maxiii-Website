const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUTPUT_DIR = '/Users/sarmilabanus/.gemini/antigravity/brain/6da5c660-77f8-410b-bddc-6adb1b6b4806/screenshots';
const DIST_DIR = path.resolve(__dirname, '../dist');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

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

async function run() {
  const browser = await chromium.launch();

  const VIEWPORTS = [
    { name: '1440', width: 1440, height: 900 },
    { name: '375', width: 375, height: 812 }
  ];

  const SECTIONS = [
    { id: 'main-content', pageNum: '1', title: 'hero' },
    { id: 'features', pageNum: '2', title: 'macros' },
    { id: 'home-food', pageNum: '4', title: 'home-food' },
    { id: 'adaptive', pageNum: '5', title: 'target' },
    { id: 'training', pageNum: '6', title: 'training' },
    { id: 'scanner', pageNum: '7', title: 'scanner' },
    { id: 'join', pageNum: '8', title: 'join' }
  ];

  for (const vp of VIEWPORTS) {
    console.log(`\nCapturing viewports at ${vp.width}x${vp.height}...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();

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

    await page.goto('http://app.local/');
    await page.waitForTimeout(1000);

    for (const sec of SECTIONS) {
      const loc = page.locator(`#${sec.id}`);
      if (await loc.count() > 0) {
        await loc.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600); // Allow GSAP / WebGL / fonts to settle

        const filename = `page-${sec.pageNum}-${sec.title}-${vp.name}.png`;
        const filePath = path.join(OUTPUT_DIR, filename);
        await loc.screenshot({ path: filePath });
        console.log(`Saved screenshot: ${filename}`);
      } else {
        console.warn(`Section #${sec.id} not found on page!`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\nAll screenshots captured successfully in:', OUTPUT_DIR);
}

run().catch((err) => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
