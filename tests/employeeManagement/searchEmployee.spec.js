import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 2: Employee Management - Search Employee', () => {
  // ─── C. Search ────────────────────────────────────────────────────────────
  test('TC-08 | Searching with a non-existent Employee ID returns zero table rows', async ({ pimPage, page }) => {
    // Employee Id is a plain text input — avoids autocomplete-filter issues
    await pimPage.employeeIdSearchInput.fill('999999999');
    await pimPage.searchButton.click();
    // OrangeHRM renders an empty table body (no "No Records Found" text element)
    await expect(pimPage.tableRows).toHaveCount(0, { timeout: 10000 });
  });

  test('TC-09 | Reset button clears the Employee Id search field', async ({ pimPage }) => {
    await pimPage.employeeIdSearchInput.fill('12345');
    await pimPage.resetButton.click();
    await expect(pimPage.employeeIdSearchInput).toHaveValue('');
  });

  test('TC-10 | Default Search returns employees and shows a records count label', async ({ pimPage, page }) => {
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
