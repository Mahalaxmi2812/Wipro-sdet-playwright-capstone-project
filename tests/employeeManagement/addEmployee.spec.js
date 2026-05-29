import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Module 2: Employee Management - Add Employee', () => {
  // ─── B. Add Employee ──────────────────────────────────────────────────────
  test('TC-03 | Add Employee with valid First and Last Name saves and redirects to Personal Details', async ({ pimPage, page }) => {
    const uniqueName = `Auto${Date.now()}`;
    await pimPage.addEmployee(uniqueName, 'Playwright');
    await expect(page).toHaveURL(/viewPersonalDetails/);
    await expect(pimPage.firstNameInput).toHaveValue(uniqueName);
  });

  test('TC-04 | Employee ID is auto-populated on the Add Employee form', async ({ pimPage, page }) => {
    await pimPage.gotoAddEmployee();
    const empId = await pimPage.employeeIdInput.inputValue();
    expect(empId).toMatch(/^\d+$/);
  });

  test('TC-05 | Add Employee - empty First Name shows Required validation error', async ({ pimPage }) => {
    await pimPage.gotoAddEmployee();
    await pimPage.lastNameInput.fill('TestLast');
    await pimPage.saveButton.click();
    await expect(pimPage.requiredErrors.first()).toHaveText('Required');
  });

  test('TC-06 | Add Employee - empty Last Name shows Required validation error', async ({ pimPage }) => {
    await pimPage.gotoAddEmployee();
    await pimPage.firstNameInput.fill('TestFirst');
    await pimPage.lastNameInput.clear();
    await pimPage.saveButton.click();
    await expect(pimPage.requiredErrors.first()).toHaveText('Required');
  });

  test('TC-07 | Add Employee form shows First Name, Middle Name and Last Name fields', async ({ pimPage }) => {
    await pimPage.gotoAddEmployee();
    await expect(pimPage.firstNameInput).toBeVisible();
    await expect(pimPage.middleNameInput).toBeVisible();
    await expect(pimPage.lastNameInput).toBeVisible();
  });

  test('TC-15 | Add Employee form shows Create Login Details toggle', async ({ pimPage, page }) => {
    await pimPage.gotoAddEmployee();
    const loginDetailsToggle = page.locator('.oxd-switch-input');
    await expect(loginDetailsToggle).toBeVisible();
  });
});
