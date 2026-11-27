const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUTPUT_DIR = '/Users/sarmilabanus/.gemini/antigravity/brain/6da5c660-77f8-410b-bddc-6adb1b6b4806/recordings';
const SCREENSHOT_DIR = '/Users/sarmilabanus/.gemini/antigravity/brain/6da5c660-77f8-410b-bddc-6adb1b6b4806/screenshots';
const DIST_DIR = path.resolve(__dirname, '../dist');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

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

const VIEWPORTS = [
  { name: '1920', width: 1920, height: 1080 },
  { name: '1440', width: 1440, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '375', width: 375, height: 812 }
];

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

async function runQA() {
  console.log('=== STARTING AWARD-LEVEL QA AUDIT & RECORDINGS ===');
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting & Recording Viewport: ${vp.width}x${vp.height} (${vp.name})...`);
    const vpVideoDir = path.join(OUTPUT_DIR, `vp-${vp.name}`);
    if (!fs.existsSync(vpVideoDir)) fs.mkdirSync(vpVideoDir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      recordVideo: {
        dir: vpVideoDir,
        size: { width: vp.width, height: vp.height }
      }
    });

    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await setupRouting(page);

    // 1. Visit Home Page
    await page.goto('http://app.local/');
    await page.waitForTimeout(600);

    // Check no horizontal scroll
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`[QA ${vp.name}] Home Horizontal Overflow: ${hasHorizontalOverflow ? 'FAILED' : 'PASS'}`);

    // Screenshot Home Hero
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `home-hero-${vp.name}.png`) });

    // Scroll down Home through all posters
    await page.evaluate(async () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const step = window.innerHeight;
      for (let y = 0; y < scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 200));
      }
    });
    await page.waitForTimeout(600);

    // Scroll up Home
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = window.scrollY; y > 0; y -= step) {
        window.scrollTo({ top: y, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // 2. Transition: Home -> Features (Circle Iris)
    console.log(`[QA ${vp.name}] Triggering Route Transition: Home -> Features...`);
    const featuresNavLink = page.locator('a[href="/features"]').first();
    if (await featuresNavLink.isVisible()) {
      await featuresNavLink.click();
    } else {
      // Mobile menu
      const menuBtn = page.locator('button[aria-label="Open Mobile Navigation Menu"]').first();
      if (await menuBtn.isVisible()) {
        await menuBtn.click();
        await page.waitForTimeout(300);
        await page.locator('[role="dialog"] a[href="/features"]').first().click();
      }
    }
    await page.waitForTimeout(1400);

    // Screenshot Features Hero
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `features-hero-${vp.name}.png`) });

    // Scroll down Features through all 8 posters
    console.log(`[QA ${vp.name}] Scrolling Features Posters...`);
    await page.evaluate(async () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const step = window.innerHeight;
      for (let y = 0; y < scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 220));
      }
    });
    await page.waitForTimeout(600);

    // Screenshot Features Closing Poster
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `features-closing-${vp.name}.png`) });

    // Scroll up Features
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = window.scrollY; y > 0; y -= step) {
        window.scrollTo({ top: y, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // 3. Transition: Features -> Home (Curved Sheet)
    console.log(`[QA ${vp.name}] Triggering Route Transition: Features -> Home...`);
    const homeLogoLink = page.locator('header a[href="/"]').first();
    await homeLogoLink.click();
    await page.waitForTimeout(1400);

    // 4. Transition: Home -> Join (Giant Word Handover "START")
    console.log(`[QA ${vp.name}] Triggering Route Transition: Home -> Join...`);
    const joinVisibleLink = page.locator('a[href="/join"], a[href="/#join"]').locator('visible=true').first();
    if (await joinVisibleLink.count() > 0) {
      await joinVisibleLink.click();
    } else {
      const menuBtn = page.locator('button[aria-label="Open Mobile Navigation Menu"]').first();
      if (await menuBtn.isVisible()) {
        await menuBtn.click();
        await page.waitForTimeout(300);
        await page.locator('[role="dialog"] a[href="/#join"], [role="dialog"] a[href="/join"]').first().click();
      }
    }
    await page.waitForTimeout(1400);

    // 5. Back and Forward PopState Navigation
    console.log(`[QA ${vp.name}] Testing Browser Back / Forward History...`);
    await page.goBack();
    await page.waitForTimeout(1000);
    await page.goForward();
    await page.waitForTimeout(1000);

    console.log(`[QA ${vp.name}] Console Errors Count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn(`[QA ${vp.name}] Console errors:`, consoleErrors);
    }

    await context.close(); // Saves video to vpVideoDir
    console.log(`[QA ${vp.name}] Video saved to: ${vpVideoDir}`);
  }

  await browser.close();
  console.log('\n=== ALL QA AUDITS & RECORDINGS COMPLETE ===');
}

runQA().catch((err) => {
  console.error('QA Script Error:', err);
  process.exit(1);
});

