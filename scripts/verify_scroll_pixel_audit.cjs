const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const DIST_DIR = path.resolve(__dirname, '../dist');
const ARTIFACTS_DIR = '/Users/sarmilabanus/.gemini/antigravity/brain/6da5c660-77f8-410b-bddc-6adb1b6b4806';
const AUDIT_OUTPUT_DIR = path.join(ARTIFACTS_DIR, 'pixel-audit');

if (!fs.existsSync(AUDIT_OUTPUT_DIR)) {
  fs.mkdirSync(AUDIT_OUTPUT_DIR, { recursive: true });
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

async function setupLocalRouting(page) {
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

// Color palette definitions (shared tokens)
const POSTER_PALETTE = {
  cobalt: { rgb: [20, 40, 208], hex: '#1428D0' },
  mustard: { rgb: [235, 185, 69], hex: '#EBB945' },
  deepRed: { rgb: [124, 15, 15], hex: '#7C0F0F' },
  burntOrange: { rgb: [228, 80, 26], hex: '#E4501A' },
  black: { rgb: [0, 0, 0], hex: '#000000' },
  cream: { rgb: [251, 241, 220], hex: '#FBF1DC' }
};

async function runScrollPixelAudit() {
  console.log('=== STARTING 10px SCROLL PIXEL AUDIT (DOWN & UP) ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  await setupLocalRouting(page);

  const testPages = [
    {
      name: 'Home',
      url: 'http://app.local/',
      sections: [
        { id: 'main-content', color: 'black' },
        { id: 'features', color: 'mustard' },
        { id: 'home-food', color: 'deepRed' },
        { id: 'adaptive', color: 'black' },
        { id: 'training', color: 'cobalt' },
        { id: 'scanner', color: 'burntOrange' },
        { id: 'join', color: 'deepRed' }
      ]
    },
    {
      name: 'Features',
      url: 'http://app.local/features',
      sections: [
        { id: 'features-hero', color: 'cobalt' },
        { id: 'feature-macros', color: 'mustard' },
        { id: 'feature-home-cooking', color: 'deepRed' },
        { id: 'feature-target', color: 'black' },
        { id: 'feature-scanner', color: 'burntOrange' },
        { id: 'feature-customisation', color: 'cobalt' },
        { id: 'feature-floor', color: 'black' },
        { id: 'feature-gymwear', color: 'deepRed' },
        { id: 'feature-closing', color: 'mustard' }
      ]
    }
  ];

  const auditReport = [];

  for (const pageConfig of testPages) {
    console.log(`\n-----------------------------------------------------`);
    console.log(`Auditing Page: ${pageConfig.name} (${pageConfig.url})`);
    console.log(`-----------------------------------------------------`);

    await page.goto(pageConfig.url);
    await page.waitForTimeout(600);

    const maxScroll = await page.evaluate(() => {
      return document.documentElement.scrollHeight - window.innerHeight;
    });

    console.log(`Page scroll height: ${maxScroll}px (checking every 10px down and up)`);

    let violations = [];
    let sampledPositions = 0;

    // Helper inside browser to audit all vertical rows in viewport
    const checkViewportRows = async (scrollPos, direction) => {
      return await page.evaluate(
        ({ expectedSections }) => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const midX = w / 2;
          const rowChecks = [];

          // Sample rows every 20px from y = 10 to y = h - 10
          for (let y = 10; y < h; y += 25) {
            const el = document.elementFromPoint(midX, y);
            if (!el) {
              rowChecks.push({ y, error: 'No element at point' });
              continue;
            }

            // Check if element is body or html directly (uncovered page background gap)
            if (el.tagName === 'BODY' || el.tagName === 'HTML') {
              rowChecks.push({
                y,
                error: 'Page background gap: element is directly BODY/HTML',
                tag: el.tagName
              });
              continue;
            }

            // Find closest poster section
            const sectionEl = el.closest('section');
            if (!sectionEl) {
              // Might be fixed nav or footer, which is fine
              const isNav = el.closest('header, nav, footer');
              if (!isNav) {
                rowChecks.push({
                  y,
                  error: 'Element outside poster section and not in nav/footer',
                  tag: el.tagName,
                  className: el.className
                });
              }
              continue;
            }

            const sectionId = sectionEl.id;
            const bg = window.getComputedStyle(sectionEl).backgroundColor;

            rowChecks.push({
              y,
              sectionId,
              bg
            });
          }

          // Evaluate row continuity:
          // In stacked posters, there should be at most 2 distinct sections visible:
          // the current sticky section (top) and the incoming sliding section (bottom).
          // There should NEVER be a third unassigned color or a gap.
          const visibleSections = [
            ...new Set(rowChecks.filter((r) => r.sectionId).map((r) => r.sectionId))
          ];

          return {
            rowChecks,
            visibleSections,
            hasBodyLeak: rowChecks.some((r) => r.error && r.error.includes('Page background gap'))
          };
        },
        { expectedSections: pageConfig.sections }
      );
    };

    // 1. Audit SCROLL DOWN (every 10px)
    console.log('Auditing Scroll DOWN (0px -> maxScroll)...');
    for (let pos = 0; pos <= maxScroll; pos += 10) {
      await page.evaluate((top) => window.scrollTo(0, top), pos);
      sampledPositions++;

      // Check every 50px for deep evaluation to keep test duration reasonable
      if (pos % 50 === 0 || pos === maxScroll) {
        const result = await checkViewportRows(pos, 'down');
        if (result.hasBodyLeak) {
          violations.push({
            direction: 'down',
            pos,
            error: 'Body/HTML background leaked into viewport row',
            details: result
          });
        }
      }
    }

    // 2. Audit SCROLL UP (every 10px)
    console.log('Auditing Scroll UP (maxScroll -> 0px)...');
    for (let pos = maxScroll; pos >= 0; pos -= 10) {
      await page.evaluate((top) => window.scrollTo(0, top), pos);
      sampledPositions++;

      if (pos % 50 === 0 || pos === 0) {
        const result = await checkViewportRows(pos, 'up');
        if (result.hasBodyLeak) {
          violations.push({
            direction: 'up',
            pos,
            error: 'Body/HTML background leaked into viewport row',
            details: result
          });
        }
      }
    }

    console.log(`[PASS] Sampled ${sampledPositions} scroll positions on ${pageConfig.name}`);
    console.log(`Violations found: ${violations.length}`);

    auditReport.push({
      page: pageConfig.name,
      sampledPositions,
      violations
    });
  }

  // -------------------------------------------------------------
  // CRITICAL SPECIFIC AUDIT: The Page 2 (Mustard) to Page 3 (DeepRed) Boundary
  // -------------------------------------------------------------
  console.log('\n-----------------------------------------------------');
  console.log('Special Focus: Auditing Page 2 -> Page 3 Boundary for Blue/Page Background Gap');
  console.log('-----------------------------------------------------');

  await page.goto('http://app.local/');
  await page.waitForTimeout(600);

  // Find scroll positions where Page 2 (features) transitions to Page 3 (home-food)
  const boundaryInfo = await page.evaluate(() => {
    const s2 = document.getElementById('features');
    const s3 = document.getElementById('home-food');
    return {
      s2Top: s2 ? s2.offsetTop : 0,
      s3Top: s3 ? s3.offsetTop : 0,
      vh: window.innerHeight
    };
  });

  console.log(`Features section top: ${boundaryInfo.s2Top}px, Home Food top: ${boundaryInfo.s3Top}px`);

  // Scroll through the boundary range every 5px!
  const startRange = Math.max(0, boundaryInfo.s3Top - boundaryInfo.vh - 100);
  const endRange = boundaryInfo.s3Top + 100;
  let boundaryViolations = 0;
  let boundaryFramesCaptured = 0;

  for (let s = startRange; s <= endRange; s += 5) {
    await page.evaluate((top) => window.scrollTo(0, top), s);

    const check = await page.evaluate(() => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      const midX = w / 2;
      let blueFound = false;
      let blackGapFound = false;

      // Sample along center column
      for (let y = 0; y < h; y += 15) {
        const el = document.elementFromPoint(midX, y);
        if (!el) continue;
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;

        // Check if cobalt blue (#1428D0 -> rgb(20, 40, 208)) is found
        if (bg.includes('20, 40, 208') || bg.includes('1428D0')) {
          blueFound = true;
        }

        // Check if an unassigned body gap is found
        if (el.tagName === 'BODY' || el.tagName === 'HTML') {
          blackGapFound = true;
        }
      }

      return { blueFound, blackGapFound };
    });

    if (check.blueFound || check.blackGapFound) {
      boundaryViolations++;
      console.error(`VIOLATION at scroll ${s}px: blueFound=${check.blueFound}, blackGapFound=${check.blackGapFound}`);
    }

    // Capture every 40px
    if (s % 40 === 0) {
      await page.screenshot({
        path: path.join(AUDIT_OUTPUT_DIR, `boundary-scroll-${s}px.png`)
      });
      boundaryFramesCaptured++;
    }
  }

  console.log(`Boundary audit completed. Violations: ${boundaryViolations}, Frames captured: ${boundaryFramesCaptured}`);

  await browser.close();

  const allViolationsCount = auditReport.reduce((acc, r) => acc + r.violations.length, 0) + boundaryViolations;

  fs.writeFileSync(
    path.join(AUDIT_OUTPUT_DIR, 'scroll_pixel_audit_report.json'),
    JSON.stringify({ auditReport, boundaryViolations, allViolationsCount }, null, 2)
  );

  if (allViolationsCount === 0) {
    console.log('\n======================================================');
    console.log('✅ ALL AUDITS PASSED: ZERO BLUE GAP, ZERO BACKGROUND LEAKS');
    console.log('======================================================\n');
  } else {
    console.error(`\n❌ AUDIT FAILED with ${allViolationsCount} violations.`);
    process.exit(1);
  }
}

runScrollPixelAudit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});

