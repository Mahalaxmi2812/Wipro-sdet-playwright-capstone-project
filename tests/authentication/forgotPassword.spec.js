import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 1: Authentication - Forgot Password', () => {
  // ─── D. Forgot Password ───────────────────────────────────────────────────
  test('TC-09 | "Forgot your password?" link navigates to Reset Password page', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/requestPasswordResetCode/);
  });

  test('TC-10 | Forgot Password - empty username submission shows Required validation error', async ({ loginPage, forgotPasswordPage, page }) => {
    await loginPage.clickForgotPassword();
    await forgotPasswordPage.resetButton.click();
    await expect(page.locator('.oxd-input-field-error-message')).toHaveText('Required');
  });

  test('TC-11 | Forgot Password - Cancel button returns to Login page', async ({ loginPage, forgotPasswordPage, page }) => {
    await loginPage.clickForgotPassword();
    await forgotPasswordPage.cancel();
    await expect(page).toHaveURL(/login/);
  });
});
