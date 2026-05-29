export class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.resetButton = page.getByRole('button', { name: 'Reset Password' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async resetPassword(username) {
    await this.usernameInput.fill(username);
    await this.resetButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
