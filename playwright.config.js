// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['html'],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results', suiteTitle: false }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
  timeout: 60000,

  projects: [
    // ── 1. Login once and save session ────────────────────────────────────────
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },

    // ── 2. Auth tests — NO storageState (they test login/logout behaviour) ───
    {
      name: 'authentication',
      testMatch: /tests\/authentication\/.*/,
      use: { ...devices['Desktop Chrome'] },
    },

    // ── 3. Module tests — reuse saved session (no repeated logins) ───────────
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
      testIgnore: [/auth\.setup\.js/, /tests\/authentication\/.*/],
    },
  ],
});
