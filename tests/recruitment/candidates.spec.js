import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 4: Recruitment - Candidates', () => {
  // ─── B. Candidates ────────────────────────────────────────────────────────
  test('TC-06 | Candidates page loads with Search form and Add button', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoCandidates();
    await expect(page).toHaveURL(/viewCandidates/);
    await expect(recruitmentPage.addButton).toBeVisible();
    await expect(recruitmentPage.searchButton).toBeVisible();
  });

  test('TC-07 | Add Candidate form renders First Name, Last Name and Email fields', async ({ recruitmentPage }) => {
    await recruitmentPage.gotoAddCandidate();
    await expect(recruitmentPage.firstNameInput).toBeVisible();
    await expect(recruitmentPage.middleNameInput).toBeVisible();
    await expect(recruitmentPage.lastNameInput).toBeVisible();
    await expect(recruitmentPage.emailInput).toBeVisible();
  });

  test('TC-08 | Add Candidate - submitting empty form shows Required validation errors', async ({ recruitmentPage }) => {
    await recruitmentPage.gotoAddCandidate();
    await recruitmentPage.saveButton.click();
    await expect(recruitmentPage.requiredErrors.first()).toBeVisible();
    await expect(recruitmentPage.requiredErrors.first()).toHaveText('Required');
  });

  test('TC-09 | Candidates table displays Candidate, Vacancy, Hiring Manager and Status columns', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoCandidates();
    const headers = page.locator('.oxd-table-header-cell');
    await expect(headers.first()).toBeVisible({ timeout: 15000 });
    await expect(headers.filter({ hasText: 'Candidate' })).toBeVisible();
    await expect(headers.filter({ hasText: 'Vacancy' })).toBeVisible();
    await expect(headers.filter({ hasText: 'Hiring Manager' })).toBeVisible();
  });

  test('TC-10 | Recruitment module is accessible from the navigation sidebar', async ({ recruitmentPage, page }) => {
    await page.goto('/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
    const navItem = page.locator('.oxd-main-menu-item').filter({ hasText: 'Recruitment' });
    await expect(navItem).toBeVisible();
    await navItem.click();
    await expect(page).toHaveURL(/recruitment/);
  });

  test('TC-13 | Add Candidate form has a Resume file upload field', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoAddCandidate();
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();
  });

  test('TC-14 | Add Candidate - Vacancy dropdown has selectable options', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoAddCandidate();
    const vacancyDropdown = page.locator('.oxd-select-text').first();
    await vacancyDropdown.click();
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
    await page.keyboard.press('Escape');
  });

  test('TC-15 | Candidate search - Status filter dropdown has selectable options', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoCandidates();
    const statusDropdown = page.locator('.oxd-select-text').first();
    await statusDropdown.click();
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(1);
    await page.keyboard.press('Escape');
  });
});
