import { test, expect } from '../../fixtures/testFixtures.js';
import { LoginPage } from '../../pages/LoginPage.js';

const VALID_USER = process.env.ADMIN_USERNAME;
const VALID_PASS = process.env.ADMIN_PASSWORD;

test.describe('Module 1: Authentication - Session Management', () => {
  // ─── E. Session Management ────────────────────────────────────────────────
  test('TC-12 | Logout clears session and redirects to Login page', async ({ loginPage, page }) => {
    await loginPage.login(VALID_USER, VALID_PASS);
    await expect(page).toHaveURL(/dashboard/);
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/login/);
  });

  test('TC-13 | After logout, navigating to a protected URL redirects back to Login', async ({ loginPage, page }) => {
    await loginPage.login(VALID_USER, VALID_PASS);
    await expect(page).toHaveURL(/dashboard/);
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/login/);
    // SPA caches the dashboard view on back, so verify session is truly gone
    // by navigating directly to a protected URL
    await page.goto('/web/index.php/dashboard/index');
    await expect(page).toHaveURL(/login/);
  });

  test('TC-14 | Unauthenticated direct URL access to Dashboard redirects to Login', async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index');
    await expect(page).toHaveURL(/login/);
  });

  // ─── F. API-Based Authentication Bypass ───────────────────────────────────
  test('TC-15 | storageState bypass grants Dashboard access without re-entering credentials', async ({ browser }) => {
    test.slow();
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const lp = new LoginPage(page1);
    await lp.goto();
    await lp.login(VALID_USER, VALID_PASS);
    await expect(page1).toHaveURL(/dashboard/);
    const savedState = await context1.storageState();
    await context1.close();

    const context2 = await browser.newContext({ storageState: savedState });
    const page2 = await context2.newPage();
    await page2.goto('/web/index.php/dashboard/index');
    await expect(page2).toHaveURL(/dashboard/);
    await expect(page2.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await context2.close();
  });
});
