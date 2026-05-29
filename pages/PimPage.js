export class PimPage {
  constructor(page) {
    this.page = page;

    // Search form — two autocomplete inputs exist (Employee Name + Supervisor Name)
    this.employeeNameInput = page.locator('.oxd-autocomplete-text-input input').first();
    // Employee Id is a plain text input in the search form
    this.employeeIdSearchInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label', { hasText: 'Employee Id' }) })
      .locator('input')
      .first();
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

    this.requiredErrors = page.locator('.oxd-input-field-error-message');

    // Employee ID on Add form (different context from search form)
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label', { hasText: 'Employee Id' }) })
      .locator('input');
  }

  async goto() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList', { waitUntil: 'domcontentloaded' });
  }

  async gotoAddEmployee() {
    await this.page.goto('/web/index.php/pim/addEmployee', { waitUntil: 'domcontentloaded' });
  }

  async addEmployee(firstName, lastName) {
    await this.gotoAddEmployee();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
    await this.page.waitForURL(/viewPersonalDetails/, { timeout: 30000 });
  }
}
