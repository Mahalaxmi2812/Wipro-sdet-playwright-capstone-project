import { test, expect } from '../../fixtures/testFixtures.js';

const VALID_PASS = process.env.ADMIN_PASSWORD;

test.describe('Module 1: Authentication - Security', () => {
  // ─── C. Security / Injection ──────────────────────────────────────────────
  test("TC-07 | SQL injection string in username does not authenticate", async ({ loginPage, page }) => {
    await loginPage.login("' OR '1'='1", VALID_PASS);
    await expect(page).not.toHaveURL(/dashboard/);
    await expect(loginPage.errorAlert).toBeVisible();
  });

  test('TC-08 | XSS payload in username is not executed as script', async ({ loginPage }) => {
    let dialogFired = false;
    loginPage.page.on('dialog', async (dialog) => {
      dialogFired = true;
      await dialog.dismiss();
    });
    await loginPage.usernameInput.fill('<script>alert("xss")</script>');
    await loginPage.passwordInput.fill(VALID_PASS);
    await loginPage.loginButton.click();
    await expect(loginPage.errorAlert).toBeVisible();
    expect(dialogFired).toBe(false);
  });
});
