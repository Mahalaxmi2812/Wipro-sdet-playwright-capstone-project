import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 3: Leave Management - Leave Lists', () => {
  // ─── B. Leave Lists ───────────────────────────────────────────────────────
  test('TC-06 | My Leave List page loads with Search form', async ({ leavePage, page }) => {
    await leavePage.gotoMyLeave();
    await expect(page).toHaveURL(/viewMyLeaveList/);
    await expect(leavePage.searchButton).toBeVisible();
  });

  test('TC-07 | Admin Leave List page loads with Search form', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveList();
    await expect(page).toHaveURL(/viewLeaveList/);
    await expect(leavePage.searchButton).toBeVisible();
  });

  test('TC-12 | My Leave list table displays Leave Date, Leave Type and Status column headers', async ({ leavePage, page }) => {
    await leavePage.gotoMyLeave();
    const headers = page.locator('.oxd-table-header-cell');
    await expect(headers.first()).toBeVisible({ timeout: 15000 });
    await expect(headers.filter({ hasText: /Date/ })).toBeVisible();
    await expect(headers.filter({ hasText: 'Leave Type' })).toBeVisible();
    await expect(headers.filter({ hasText: 'Status' })).toBeVisible();
  });
});
