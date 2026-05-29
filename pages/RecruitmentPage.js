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
    this.hiringManagerInput = page.locator('.oxd-autocomplete-text-input input').first();

    // Add Candidate form
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    // Email field uses placeholder 'Type here' — find by label instead
    this.emailInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.locator('label', { hasText: 'Email' }) })
      .locator('input');
  }

  async gotoCandidates() {
    await this.page.goto('/web/index.php/recruitment/viewCandidates', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('.oxd-table', { timeout: 15000 });
  }

  async gotoAddVacancy() {
    await this.page.goto('/web/index.php/recruitment/addJobVacancy', { waitUntil: 'domcontentloaded' });
  }

  async gotoAddCandidate() {
    await this.page.goto('/web/index.php/recruitment/addCandidate', { waitUntil: 'domcontentloaded' });
  }
}
