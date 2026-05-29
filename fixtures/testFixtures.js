import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage.js';
import { PimPage } from '../pages/PimPage.js';
import { LeavePage } from '../pages/LeavePage.js';
import { RecruitmentPage } from '../pages/RecruitmentPage.js';

export const test = base.extend({
  // ── Unauthenticated fixtures (auth tests use these directly) ──────────────
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },

  // ── Authenticated fixtures ─────────────────────────────────────────────────
  // storageState is injected automatically by playwright.config.js (setup project).
  // The `page` fixture already has the saved session — no need to log in again.

  pimPage: async ({ page }, use) => {
    const pimPage = new PimPage(page);
    await pimPage.goto();
    await use(pimPage);
  },

  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },

  recruitmentPage: async ({ page }, use) => {
    await use(new RecruitmentPage(page));
  },
});

export { expect };
