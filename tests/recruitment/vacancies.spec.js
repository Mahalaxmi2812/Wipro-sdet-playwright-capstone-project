import { test, expect } from '../../fixtures/testFixtures.js';

// Note: /recruitment/viewRecruitment renders blank for the Admin user.
// Vacancy management is tested via the Add Vacancy form which is accessible.

test.describe('Module 4: Recruitment - Vacancies', () => {
  // ─── A. Add Vacancy form ──────────────────────────────────────────────────
  test('TC-01 | Add Vacancy page loads with Job Title dropdown and Vacancy Name input', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoAddVacancy();
    await expect(page).toHaveURL(/addJobVacancy/);
    await expect(recruitmentPage.jobTitleDropdown).toBeVisible();
    await expect(recruitmentPage.vacancyNameInput).toBeVisible();
  });

  test('TC-02 | Add Vacancy form shows Job Title, Vacancy Name, Hiring Manager and Description fields', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoAddVacancy();
    await expect(recruitmentPage.jobTitleDropdown).toBeVisible();
    await expect(recruitmentPage.vacancyNameInput).toBeVisible();
    await expect(page.locator('textarea.oxd-textarea')).toBeVisible();
    await expect(recruitmentPage.hiringManagerInput).toBeVisible();
  });

  test('TC-03 | Add Vacancy - Save button is visible on the form', async ({ recruitmentPage }) => {
    await recruitmentPage.gotoAddVacancy();
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
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('TC-11 | Add Vacancy - Hiring Manager autocomplete input is visible and interactive', async ({ recruitmentPage }) => {
    await recruitmentPage.gotoAddVacancy();
    await expect(recruitmentPage.hiringManagerInput).toBeVisible();
    await recruitmentPage.hiringManagerInput.fill('A');
    await expect(recruitmentPage.hiringManagerInput).toHaveValue('A');
  });

  test('TC-12 | Add Vacancy - Description textarea is visible and accepts text input', async ({ recruitmentPage, page }) => {
    await recruitmentPage.gotoAddVacancy();
    const descriptionArea = page.locator('textarea.oxd-textarea');
    await expect(descriptionArea).toBeVisible();
    await descriptionArea.fill('Test vacancy description');
    await expect(descriptionArea).toHaveValue('Test vacancy description');
  });
});
