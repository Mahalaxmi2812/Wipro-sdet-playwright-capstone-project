import { test, expect } from '../../fixtures/testFixtures.js';

const VALID_USER = process.env.ADMIN_USERNAME;
const VALID_PASS = process.env.ADMIN_PASSWORD;

test.describe('Module 1: Authentication - Login', () => {
  // ─── A. Happy Path ────────────────────────────────────────────────────────
  test('TC-01 | Valid credentials redirect to Dashboard', async ({ loginPage, page }) => {
    await loginPage.login(VALID_USER, VALID_PASS);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('TC-02 | Login page renders all expected UI elements', async ({ loginPage, page }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(page).toHaveTitle(/OrangeHRM/);
  });

  // ─── B. Negative / Validation ─────────────────────────────────────────────
  test('TC-03 | Invalid username + valid password shows Invalid credentials error', async ({ loginPage }) => {
    await loginPage.login('InvalidUser99', VALID_PASS);
    await expect(loginPage.errorAlert).toContainText('Invalid credentials');
  });

  test('TC-04 | Valid username + invalid password shows Invalid credentials error', async ({ loginPage }) => {
    await loginPage.login(VALID_USER, 'WrongPassword!');
    await expect(loginPage.errorAlert).toContainText('Invalid credentials');
  });

  test('TC-05 | Empty username field shows Required validation error', async ({ loginPage }) => {
    await loginPage.passwordInput.fill(VALID_PASS);
    await loginPage.loginButton.click();
    await expect(loginPage.requiredErrors.first()).toHaveText('Required');
  });

  test('TC-06 | Empty password field shows Required validation error', async ({ loginPage }) => {
    await loginPage.usernameInput.fill(VALID_USER);
    await loginPage.loginButton.click();
    await expect(loginPage.requiredErrors.first()).toHaveText('Required');
  });
});
