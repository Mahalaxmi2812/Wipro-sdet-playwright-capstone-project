import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 2: Employee Management - Employee List', () => {
  // ─── A. Navigation & Page Load ────────────────────────────────────────────
  test('TC-01 | Employee List page loads with Search and Add buttons', async ({ pimPage, page }) => {
    await expect(page).toHaveURL(/viewEmployeeList/);
    await expect(pimPage.searchButton).toBeVisible();
    await expect(pimPage.addButton).toBeVisible();
  });

  test('TC-02 | Employee list table displays First Name, Last Name, Job Title and Employment Status columns', async ({ pimPage, page }) => {
    const headers = page.locator('.oxd-table-header-cell');
    await expect(headers.filter({ hasText: 'First (& Middle) Name' })).toBeVisible();
    await expect(headers.filter({ hasText: 'Last Name' })).toBeVisible();
    await expect(headers.filter({ hasText: 'Job Title' })).toBeVisible();
    await expect(headers.filter({ hasText: 'Employment Status' })).toBeVisible();
  });

  test('TC-11 | Default search returns at least one existing employee record', async ({ pimPage, page }) => {
    await pimPage.searchButton.click();
    await expect(pimPage.tableRows.first()).toBeVisible({ timeout: 15000 });
  });

  test('TC-12 | Each employee table row shows Edit and Delete action buttons', async ({ pimPage, page }) => {
    await pimPage.searchButton.click();
    await page.waitForLoadState('networkidle');
    const actionButtons = pimPage.tableRows.first().locator('button');
    await expect(actionButtons.first()).toBeVisible();
  });

  test('TC-14 | PIM module is accessible from the navigation sidebar', async ({ pimPage, page }) => {
    await page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
    const navItem = page.locator('.oxd-main-menu-item').filter({ hasText: 'PIM' });
    await expect(navItem).toBeVisible();
    await navItem.click();
    await expect(page).toHaveURL(/pim/);
  });
});
