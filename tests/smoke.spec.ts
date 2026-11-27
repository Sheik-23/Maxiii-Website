import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/features', '/training', '/scanner', '/join', '/privacy', '/terms'];

test.describe('MAXIII Revised Compliance Smoke Tests', () => {
  for (const route of ROUTES) {
    test(`Route "${route}" loads cleanly without console errors or overflow`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(route);
      await expect(page).toHaveTitle(/MAXIII/);
      expect(consoleErrors).toHaveLength(0);

      // Verify no horizontal overflow at viewport
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }

  test('STRICT NEGATIVE: Confirm zero price, zero AI, zero IFCT, and zero paywall language', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      const bodyText = await page.innerText('body');

      // Zero prices & currencies
      expect(bodyText).not.toMatch(/[₹$€£]/);
      expect(bodyText).not.toMatch(/per month/i);
      expect(bodyText).not.toMatch(/subscription plan/i);

      // Zero AI mentions anywhere
      expect(bodyText).not.toMatch(/\bAI\b/i);

      // Zero ICMR / IFCT mentions anywhere
      expect(bodyText).not.toMatch(/IFCT/i);
      expect(bodyText).not.toMatch(/ICMR/i);

      // Zero paywall or harsh commercial words
      expect(bodyText).not.toMatch(/paywall/i);
      expect(bodyText).not.toMatch(/zero payment/i);
      expect(bodyText).not.toMatch(/hard paywall/i);
      expect(bodyText).not.toMatch(/upsell/i);

      // Zero phonetic spelling
      expect(bodyText).not.toMatch(/maxeee/i);

      // COPY FIX: Zero katori, ladle, dal, roti, regional food words
      expect(bodyText).not.toMatch(/katori/i);
      expect(bodyText).not.toMatch(/ladle/i);
      expect(bodyText).not.toMatch(/\bdal\b/i);
      expect(bodyText).not.toMatch(/\bdals\b/i);
      expect(bodyText).not.toMatch(/roti/i);

      // COPY FIX: Zero languages or regional language mentions
      expect(bodyText).not.toMatch(/\btamil\b(?!\s*nadu)/i);
      expect(bodyText).not.toMatch(/hindi/i);
      expect(bodyText).not.toMatch(/telugu/i);
      expect(bodyText).not.toMatch(/languages/i);
      expect(bodyText).not.toMatch(/\bfour\b/i);

      // COPY FIX: "14 days" appears no more than once site-wide (at most 1 on any route)
      const matches14Days = bodyText.match(/14 days/gi) || [];
      expect(matches14Days.length).toBeLessThanOrEqual(1);

      // On legal pages, "14 days" must be 0
      if (route === '/privacy' || route === '/terms') {
        expect(matches14Days).toHaveLength(0);
      }
    }
  });

  test('STRICT NEGATIVE: Zero digits other than "14", zero banned words, zero deleted labels, and zero repeats', async ({ page }) => {
    const BANNED_PATTERNS = [
      /\binstant\b/i,
      /\blightning\b/i,
      /\bverified\b/i,
      /in seconds/i,
      /\bprecision\b/i,
      /\bbenchmark\b/i,
      /\bfriction\b/i,
      /->/
    ];

    const DELETED_LABELS = [
      /Poster archive/i,
      /Plate I\b/i,
      /Plate II\b/i,
      /Plate III\b/i,
      /Plate IV\b/i,
      /Plate V\b/i,
      /Plate VI\b/i,
      /Plate I to VI/i,
      /Foundational archives/i,
      /Maxiii archive/i,
      /Macro specification/i,
      /Metabolic response/i,
      /Measured yield/i,
      /Calibrated for lifters/i,
      /Instant nutrition capture/i
    ];

    await page.goto('/');
    const bodyText = await page.innerText('body');

    // Banned words check (instant, lightning, verified, in seconds, precision, benchmark, friction, ->)
    for (const pattern of BANNED_PATTERNS) {
      expect(bodyText, `Page text contains banned pattern: ${pattern}`).not.toMatch(pattern);
    }

    // Deleted labels check
    for (const label of DELETED_LABELS) {
      expect(bodyText, `Page text contains deleted label: ${label}`).not.toMatch(label);
    }

    // Fails on any digit other than "14"
    const digitsFound = bodyText.match(/\d+/g) || [];
    for (const d of digitsFound) {
      expect(d, `Found forbidden number "${d}" on page. Only "14" is allowed.`).toBe('14');
    }

    // "14" appears at most once site-wide (or 0 times when trial line is omitted)
    const matches14Days = bodyText.match(/14 days/gi) || [];
    expect(matches14Days.length).toBeLessThanOrEqual(1);
    expect(digitsFound.length).toBeLessThanOrEqual(1);

    // Repeats: "Count what you actually eat." appears once only (hero)
    const countEatMatches = (bodyText.match(/Count what you actually eat\./gi) || []).length;
    expect(countEatMatches, 'Expected "Count what you actually eat." to appear once only in hero').toBe(1);

    // Repeats: "No payment up front" must appear at most once (currently 0 after copy update)
    const noPaymentMatches = (bodyText.match(/No payment up front/gi) || []).length;
    expect(noPaymentMatches).toBeLessThanOrEqual(1);
  });

  test('Built HTML negative check and 14 days site-wide check', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const builtHtmlPath = path.resolve('dist/index.html');
    if (fs.existsSync(builtHtmlPath)) {
      const html = fs.readFileSync(builtHtmlPath, 'utf8');
      expect(html).not.toMatch(/katori/i);
      expect(html).not.toMatch(/ladle/i);
      expect(html).not.toMatch(/\bdal\b/i);
      expect(html).not.toMatch(/roti/i);
      expect(html).not.toMatch(/tamil/i);
      expect(html).not.toMatch(/hindi/i);
      expect(html).not.toMatch(/telugu/i);
      expect(html).not.toMatch(/languages/i);
      expect(html).not.toMatch(/\bfour\b/i);
      
      const count14 = (html.match(/14 days/gi) || []).length;
      expect(count14).toBeLessThanOrEqual(1);
    }
  });

  test('Required unchanged lines exist in product copy', async ({ page }) => {
    await page.goto('/');
    const bodyText = await page.innerText('body');
    const normalizedText = bodyText.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ');
    expect(normalizedText).toContain('Count what you actually eat.');
    expect(normalizedText).toContain('Every macro, from the first log.');
    expect(normalizedText).toContain('Your target moves when you do.');
    expect(normalizedText).toContain('FUEL THE LIFT');
    expect(normalizedText).toContain('Home food.');
    expect(normalizedText).toContain('Log ingredients raw or cooked. MAXIII accounts for cooking changes, including oil and ghee, so your numbers reflect the plate in front of you.');
    expect(normalizedText).toContain('Try Maxiii and maximise your gains');
  });

  test('Marquee Ribbon: First text node is complete and not clipped', async ({ page }) => {
    await page.goto('/');
    const ribbon = page.locator('[data-testid="marquee-ribbon"]').first();
    await expect(ribbon).toBeVisible();

    const firstItem = ribbon.locator('[data-testid="marquee-item"]').first();
    const text = (await firstItem.textContent()) || (await firstItem.innerText()) || '';

    // Verify first letter is "C" (from "Carbohydrates, fibre, protein, fat") and not cut or mid-word
    expect(text.trim().startsWith('Carbohydrates')).toBe(true);

    // Verify bounding box has valid layout
    const box = await firstItem.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(0);
    }
  });

  test('Consistent CTA: "Join the waitlist"', async ({ page }) => {
    await page.goto('/');
    const heroBtn = page.locator('a:has-text("Join the waitlist"):visible').first();
    await expect(heroBtn).toBeVisible();
  });
});
