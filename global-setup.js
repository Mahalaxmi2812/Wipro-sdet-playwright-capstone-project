import { chromium } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const AUTH_FILE = 'playwright/.auth/user.json';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL: process.env.BASE_URL });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
  await page.waitForURL(/dashboard/, { timeout: 30000 });

  await context.storageState({ path: AUTH_FILE });
  await browser.close();
}
