import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage.js';
import { PimPage } from '../pages/PimPage.js';
import { LeavePage } from '../pages/LeavePage.js';
import { RecruitmentPage } from '../pages/RecruitmentPage.js';

export const test = base.extend({
  // ── Unauthenticated fixtures ──────────────────────────────────────────────
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },

  // ── Authenticated fixtures ─────────────────────────────────────────────────
  // Shared login step extracted so each module fixture reuses the same logic.
  _authedPage: [
    async ({ page }, use) => {
      const lp = new LoginPage(page);
      await lp.goto();
      await lp.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
      await page.waitForURL(/dashboard/, { timeout: 20000 });
      await use(page);
    },
    { auto: false },
  ],

  pimPage: async ({ _authedPage }, use) => {
    const pimPage = new PimPage(_authedPage);
    await pimPage.goto();
    await use(pimPage);
  },

  leavePage: async ({ _authedPage }, use) => {
    await use(new LeavePage(_authedPage));
  },

  recruitmentPage: async ({ _authedPage }, use) => {
    await use(new RecruitmentPage(_authedPage));
  },
});

export { expect };
