export class RecruitmentPage {
  constructor(page) {
    this.page = page;

    // Shared
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.requiredErrors = page.locator('.oxd-input-field-error-message');

    // Add Vacancy form
    this.jobTitleDropdown = page.locator('.oxd-select-text').first();
    this.vacancyNameInput = page.locator('.oxd-input').nth(1);

    // Add Candidate form
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    // OrangeHRM email field — find by label since placeholder varies
    this.emailInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label', { hasText: /email/i }) })
      .locator('input');
  }

  async gotoVacancies() {
    await this.page.goto('/web/index.php/recruitment/viewRecruitment', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('.oxd-table', { timeout: 15000 });
  }

  async gotoCandidates() {
    await this.page.goto('/web/index.php/recruitment/viewCandidates', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('.oxd-table', { timeout: 15000 });
  }

  async gotoAddVacancy() {
    await this.page.goto('/web/index.php/recruitment/addJobVacancy', { waitUntil: 'networkidle' });
  }

  async gotoAddCandidate() {
    await this.page.goto('/web/index.php/recruitment/addCandidate', { waitUntil: 'networkidle' });
  }
}
