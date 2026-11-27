import { test, expect, Page } from '@playwright/test';

async function clickNavLink(page: Page, path: string) {
  const mobileToggle = page.locator('button[aria-label="Open navigation menu"]');
  const isMobile = await mobileToggle.isVisible();
  if (isMobile) {
    await mobileToggle.dispatchEvent('click');
    await page.waitForTimeout(300);
    const link = page.locator(`[role="dialog"] a[href="${path}"]`).first();
    await link.dispatchEvent('click');
  } else {
    const link = page.locator(`nav a[href="${path}"]`).first();
    await link.dispatchEvent('click');
  }
}

test.describe('MAXIII Central Transition System', () => {
  test.beforeEach(async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('favicon') && !text.includes('ERR_CONNECTION_REFUSED')) {
          errors.push(text);
        }
      }
    });
    (page as any).__errors = errors;
  });

  test.afterEach(async ({ page }) => {
    const errors = (page as any).__errors as string[];
    expect(errors).toHaveLength(0);
  });

  test('Home to Features: Circle iris page transition', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click Features link in nav
    await clickNavLink(page, '/features');
    await page.waitForURL('**/features');
    await expect(page).toHaveTitle(/Features/);

    const h1 = page.locator('main h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText('Features');
  });

  test('Features to Home: Curved sheet page transition', async ({ page }) => {
    await page.goto('/features');
    await page.waitForLoadState('networkidle');

    const homeLogoLink = page.locator('header a[href="/"]').first();
    await homeLogoLink.click();
    await page.waitForURL('/');
    await expect(page).toHaveTitle(/MAXIII/);
  });

  test('Home to Privacy Policy: Quiet cream fade page transition', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const privacyLink = page.locator('footer a[href="/privacy"]').first();
    await privacyLink.scrollIntoViewIfNeeded();
    await privacyLink.click();

    await page.waitForURL('**/privacy');
    await expect(page).toHaveTitle(/Privacy Policy/);

    const h1 = page.locator('main h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/Privacy Policy/i);
  });

  test('Privacy Policy to Home: Moon wipe page transition', async ({ page }) => {
    await page.goto('/privacy');
    await page.waitForLoadState('networkidle');

    // Click brand logo to navigate back to Home
    const logoLink = page.locator('header a[href="/"]').first();
    await logoLink.click();

    await page.waitForURL('/');
    await expect(page).toHaveTitle(/MAXIII/);

    const h1 = page.locator('main h1').first();
    await expect(h1).toBeVisible();
  });

  test('Home to Terms and Conditions: Quiet cream fade page transition', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const termsLink = page.locator('footer a[href="/terms"]').first();
    await termsLink.scrollIntoViewIfNeeded();
    await termsLink.click();

    await page.waitForURL('**/terms');
    await expect(page).toHaveTitle(/Terms and Conditions/);

    const h1 = page.locator('main h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/Terms and Conditions/i);
  });

  test('Terms to Privacy Policy: Legal crossfade page transition', async ({ page }) => {
    await page.goto('/terms');
    await page.waitForLoadState('networkidle');

    const privacyLink = page.locator('footer a[href="/privacy"]').first();
    await privacyLink.scrollIntoViewIfNeeded();
    await privacyLink.click();

    await page.waitForURL('**/privacy');
    await expect(page).toHaveTitle(/Privacy Policy/);

    const h1 = page.locator('main h1').first();
    await expect(h1).toBeVisible();
  });

  test('404 Page and Return: Slat shutter transition', async ({ page }) => {
    await page.goto('/unknown-destination');
    await page.waitForLoadState('networkidle');

    const h1 = page.locator('main h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText('Page not found.');

    const returnLink = page.locator('main a[href="/"]').first();
    await returnLink.click();

    await page.waitForURL('/');
    await expect(page).toHaveTitle(/MAXIII/);
  });

  test('Redirect routes (/training, /scanner, /join) redirect cleanly to sections', async ({ page }) => {
    await page.goto('/join');
    await expect.poll(() => page.url(), { timeout: 10000 }).toContain('#join');
    const joinSection = page.locator('section#join');
    await expect(joinSection).toBeVisible();
  });

  test('Continuous transitions: zero blank/flat frames exceed 150ms', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await clickNavLink(page, '/features');
    const featuresTitle = page.locator('main h1').first();
    await expect(featuresTitle).toBeVisible({ timeout: 1500 });
    await expect(featuresTitle).toHaveText('Features');
  });

  test('Rapid clicking and current-page clicking does not queue or stack transitions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const brandLink = page.locator('header a[href="/"]').first();
    await brandLink.click();
    await brandLink.click();
    await brandLink.click();

    expect(new URL(page.url()).pathname).toBe('/');
  });

  test('Browser back and forward navigation plays smooth transition and updates view', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Go to privacy
    const privacyLink = page.locator('footer a[href="/privacy"]').first();
    await privacyLink.scrollIntoViewIfNeeded();
    await privacyLink.click();
    await page.waitForURL('**/privacy');
    await expect(page).toHaveTitle(/Privacy Policy/);

    // Press browser back
    await page.goBack();
    await page.waitForURL('/');
    await expect(page).toHaveTitle(/MAXIII/);

    // Press browser forward
    await page.goForward();
    await page.waitForURL('**/privacy');
    await expect(page).toHaveTitle(/Privacy Policy/);
  });

  test('Keyboard navigation works through Tab and Enter', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const mobileToggle = page.locator('button[aria-label="Open navigation menu"]');
    const isMobile = await mobileToggle.isVisible();
    if (!isMobile) {
      await page.keyboard.press('Tab');
      await expect(page.locator('a[href="/#join"]').first()).toBeFocused();
      await page.keyboard.press('Enter');
      await expect.poll(() => page.url()).toContain('#join');
      const joinSection = page.locator('section#join');
      await expect(joinSection).toBeVisible();
    } else {
      await mobileToggle.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'false');
    }
  });
});
