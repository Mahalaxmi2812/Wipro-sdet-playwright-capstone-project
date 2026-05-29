export class PimPage {
  constructor(page) {
    this.page = page;

    // Search form — use .first() because the PIM search form has two autocomplete inputs
    this.employeeNameInput = page.locator('.oxd-autocomplete-text-input input').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });

    // Add employee form
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Results
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.noRecordsText = page.locator('.oxd-table-body span').filter({ hasText: 'No Records Found' });
    this.requiredErrors = page.locator('.oxd-input-field-error-message');

    // Employee ID on Add form
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label', { hasText: 'Employee Id' }) })
      .locator('input');
  }

  async goto() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList', { waitUntil: 'networkidle' });
  }

  async gotoAddEmployee() {
    await this.page.goto('/web/index.php/pim/addEmployee', { waitUntil: 'networkidle' });
  }

  async addEmployee(firstName, lastName) {
    await this.gotoAddEmployee();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
    await this.page.waitForURL(/viewPersonalDetails/, { timeout: 20000 });
  }
}
