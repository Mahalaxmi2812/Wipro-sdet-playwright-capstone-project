import { test, expect } from '../../fixtures/testFixtures.js';

// Note: The Admin user cannot access /leave/takeLeave (apply for self).
// These tests validate the Admin Leave List and its filter form instead.

test.describe('Module 3: Leave Management - Leave Requests', () => {
  // ─── A. Admin Leave List filters and table ────────────────────────────────
  test('TC-01 | Admin Leave List loads with filter form and results table', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveList();
    await expect(page).toHaveURL(/viewLeaveList/);
    await expect(leavePage.searchButton).toBeVisible();
    await expect(page.locator('.oxd-table')).toBeVisible();
  });

  test('TC-02 | Leave List filter - From Date input is visible and editable', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveList();
    const fromDate = page.locator('.oxd-date-input input').first();
    await expect(fromDate).toBeVisible();
    await fromDate.fill('01/01/2025');
    await fromDate.press('Tab');
    await expect(fromDate).not.toHaveValue('');
  });

  test('TC-03 | Leave List filter - Show Leave Status dropdown has selectable options', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveList();
    const leaveTypeDropdown = page.locator('.oxd-select-text').first();
    await leaveTypeDropdown.click();
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(1);
    await page.keyboard.press('Escape');
  });

  test('TC-04 | Leave List filter - Leave Type dropdown has selectable options', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveList();
    const statusDropdown = page.locator('.oxd-select-text').nth(1);
    await statusDropdown.click();
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(1);
    await page.keyboard.press('Escape');
  });

  test('TC-05 | Leave List table displays Leave Date, Leave Type and Status columns', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveList();
    const headers = page.locator('.oxd-table-header-cell');
    await expect(headers.first()).toBeVisible({ timeout: 15000 });
    await expect(headers.filter({ hasText: /Date/ })).toBeVisible();
    await expect(headers.filter({ hasText: 'Leave Type' })).toBeVisible();
    await expect(headers.filter({ hasText: 'Status' })).toBeVisible();
  });

  test('TC-11 | Leave List filter - Employee Name autocomplete field is present', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveList();
    const empNameInput = page.locator('.oxd-autocomplete-text-input input').first();
    await expect(empNameInput).toBeVisible();
  });
});
