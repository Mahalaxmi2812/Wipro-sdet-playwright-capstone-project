import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 3: Leave Management - Leave Administration', () => {
  // ─── C. Administration ────────────────────────────────────────────────────
  test('TC-08 | Leave Entitlement page loads and is accessible to Admin', async ({ leavePage, page }) => {
    await leavePage.gotoEntitlements();
    await expect(page).toHaveURL(/viewLeaveEntitlements/);
    await expect(page.locator('.oxd-topbar-header-breadcrumb')).toContainText(/Entitlements/i);
  });

  test('TC-09 | Leave Types list page loads and shows Leave Type in breadcrumb', async ({ leavePage, page }) => {
    await leavePage.gotoLeaveTypes();
    await expect(page).toHaveURL(/viewLeaveTypeList/);
    await expect(page.locator('.oxd-topbar-header-breadcrumb')).toContainText(/Leave Type/i);
  });

  test('TC-10 | Leave module is accessible from the navigation sidebar', async ({ leavePage, page }) => {
    await page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
    const leaveNavItem = page.locator('.oxd-main-menu-item').filter({ hasText: 'Leave' });
    await expect(leaveNavItem).toBeVisible();
    await leaveNavItem.click();
    await expect(page).toHaveURL(/leave/);
  });

  test('TC-13 | Leave Holidays page loads with Add button', async ({ leavePage, page }) => {
    await page.goto('/web/index.php/leave/viewHolidayList', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/viewHolidayList/);
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
  });

  test('TC-14 | Leave Calendar page loads successfully', async ({ leavePage, page }) => {
    await page.goto('/web/index.php/leave/viewLeaveCalendar', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/viewLeaveCalendar/);
  });

  test('TC-15 | Leave Work Week configuration page loads successfully', async ({ leavePage, page }) => {
    await page.goto('/web/index.php/leave/viewWorkWeek', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/viewWorkWeek/);
  });
});
