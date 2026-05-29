export class LeavePage {
  constructor(page) {
    this.page = page;

    // Apply Leave form
    this.leaveTypeDropdown = page.locator('.oxd-select-text').first();
    this.fromDateInput = page.locator('.oxd-date-input input').first();
    this.toDateInput = page.locator('.oxd-date-input input').nth(1);
    this.commentInput = page.getByPlaceholder('Type Comments here');
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.requiredErrors = page.locator('.oxd-input-field-error-message');

    // Leave list
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async gotoApplyLeave() {
    await this.page.goto('/web/index.php/leave/takeLeave', { waitUntil: 'networkidle' });
  }

  async gotoMyLeave() {
    await this.page.goto('/web/index.php/leave/viewMyLeaveList', { waitUntil: 'networkidle' });
  }

  async gotoLeaveList() {
    await this.page.goto('/web/index.php/leave/viewLeaveList', { waitUntil: 'networkidle' });
  }

  async gotoEntitlements() {
    await this.page.goto('/web/index.php/leave/viewLeaveEntitlements', { waitUntil: 'networkidle' });
  }

  async gotoLeaveTypes() {
    await this.page.goto('/web/index.php/leave/viewLeaveTypeList', { waitUntil: 'networkidle' });
  }
}
