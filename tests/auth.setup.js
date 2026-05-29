import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

const AUTH_FILE = 'playwright/.auth/user.json';

// Runs ONCE before all tests — saves session so every test reuses it
setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
  await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });
  await page.context().storageState({ path: AUTH_FILE });
});
