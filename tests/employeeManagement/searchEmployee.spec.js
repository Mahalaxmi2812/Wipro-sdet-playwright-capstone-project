import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 2: Employee Management - Search Employee', () => {
  // ─── C. Search ────────────────────────────────────────────────────────────
  test('TC-08 | Searching with a non-existent employee name shows No Records Found', async ({ pimPage, page }) => {
    await pimPage.employeeNameInput.fill('ZZNonExistent999PW');
    await pimPage.searchButton.click();
    await page.waitForLoadState('networkidle');
    await expect(pimPage.noRecordsText).toBeVisible();
  });

  test('TC-09 | Reset button clears the employee name search field', async ({ pimPage }) => {
    await pimPage.employeeNameInput.fill('SomeEmployee');
    await pimPage.resetButton.click();
    await expect(pimPage.employeeNameInput).toHaveValue('');
  });

  test('TC-10 | Default Search returns a records count label', async ({ pimPage, page }) => {
    await pimPage.searchButton.click();
    await expect(pimPage.tableRows.first()).toBeVisible({ timeout: 15000 });
    const countLabel = page.locator('span').filter({ hasText: /Records/ });
    await expect(countLabel.first()).toBeVisible();
  });

  test('TC-13 | Employment Status filter dropdown has selectable options', async ({ pimPage, page }) => {
    const empStatusDropdown = page.locator('.oxd-select-text').first();
    await empStatusDropdown.click();
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(1);
    await page.keyboard.press('Escape');
  });
});
