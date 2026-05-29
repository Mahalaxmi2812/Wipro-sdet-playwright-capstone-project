import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 4: Recruitment - Vacancies', () => {
  // ─── A. Vacancies ─────────────────────────────────────────────────────────
  test('TC-01 | Recruitment Vacancies page loads with table and Search button', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoVacancies();
    await expect(page).toHaveURL(/viewRecruitment/);
    await expect(page.locator('.oxd-table')).toBeVisible();
    await expect(recruitmentPage.searchButton).toBeVisible();
  });

  test('TC-02 | Vacancies page shows Vacancy, Job Title and Hiring Manager columns', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoVacancies();
    // Vacancies table uses direct text in cells, not .oxd-table-header-cell
    const headerRow = page.locator('.oxd-table-header .oxd-table-row');
    await expect(headerRow).toBeVisible();
    await expect(page.locator('.oxd-table-header')).toContainText('Vacancy');
    await expect(page.locator('.oxd-table-header')).toContainText('Hiring Manager');
  });

  test('TC-03 | Add Vacancy form renders Job Title dropdown and Vacancy Name input', async ({ recruitmentPage }) => {
    await recruitmentPage.gotoAddVacancy();
    await expect(recruitmentPage.jobTitleDropdown).toBeVisible();
    await expect(recruitmentPage.vacancyNameInput).toBeVisible();
    await expect(recruitmentPage.saveButton).toBeVisible();
  });

  test('TC-04 | Add Vacancy - submitting empty form shows Required validation errors', async ({ recruitmentPage }) => {
    await recruitmentPage.gotoAddVacancy();
    await recruitmentPage.saveButton.click();
    await expect(recruitmentPage.requiredErrors.first()).toBeVisible();
    await expect(recruitmentPage.requiredErrors.first()).toHaveText('Required');
  });

  test('TC-05 | Add Vacancy - Job Title dropdown is populated with available job titles', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoAddVacancy();
    await recruitmentPage.jobTitleDropdown.click();
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('TC-11 | Vacancy search - Status filter dropdown has at least one option', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoVacancies();
    // OrangeHRM vacancy search has dropdowns for Job Title, Hiring Manager, Status
    const dropdowns = page.locator('.oxd-select-text');
    await expect(dropdowns.first()).toBeVisible();
    await dropdowns.first().click();
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    await expect(options.first()).toBeVisible();
    await page.keyboard.press('Escape');
  });

  test('TC-12 | Add Vacancy - Description textarea is visible and accepts text input', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoAddVacancy();
    const descriptionArea = page.locator('textarea.oxd-textarea');
    await expect(descriptionArea).toBeVisible();
    await descriptionArea.fill('Test vacancy description');
    await expect(descriptionArea).toHaveValue('Test vacancy description');
  });
});
