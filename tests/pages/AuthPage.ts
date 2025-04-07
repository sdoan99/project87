import { type Page, type Locator, expect } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signInButton: Locator;
  readonly registerButton: Locator;
  readonly resetPasswordLink: Locator;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.confirmPasswordInput = page.getByLabel('Confirm your password');
    this.signInButton = page.locator('form').getByRole('button', { name: 'Sign In' });
    this.registerButton = page.getByRole('button', { name: 'Create Account' });
    this.resetPasswordLink = page.getByRole('link', { name: 'Reset Password' });
    this.profileButton = page.locator('.profile-button').filter({ has: page.getByRole('img', { name: 'User' }) }).filter({ has: page.getByText('username') });
    this.logoutButton = page.getByRole('button', { name: 'Sign out' });
    this.errorMessage = page.getByRole('alert').filter({ hasText: /error/i });
    this.successMessage = page.getByRole('alert').filter({ hasText: /success/i });
  }

  async goto(pagePath: string) {
    await this.page.goto(`http://localhost:5173${pagePath}`);
  }

  async register(username: string, email: string, password: string, confirmPassword: string) {
    await this.goto('/register');
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.registerButton.click();
    await expect(this.page).toHaveURL(/\/register/);
  }

  async login(email: string, password: string) {
    await this.goto('/signin');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await expect(this.page).toHaveURL(/\/$/);
  }

  async logout() {
    await this.profileButton.click();
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/\/signin/);
  }

  async requestPasswordReset(email: string) {
    await this.goto('/reset-password');
    await this.emailInput.fill(email);
    await this.resetPasswordLink.click();
    await expect(this.page).toHaveURL(/\/reset-password/);
  }

  async login(identifier: string, password: string) {
    await this.goto('/signin');
    await this.emailInput.fill(identifier);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await expect(this.page).toHaveURL(/\/$/);
  }

  async updateProfile(newData: { name?: string; email?: string }) {
    await this.profileButton.click();
    if (newData.name) {
      await this.page.getByLabel('Name').fill(newData.name);
    }
    if (newData.email) {
      await this.emailInput.fill(newData.email);
    }
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(this.page).toHaveURL(/\/profile/);
  }

  async verifyLoggedIn() {
    await expect(this.page.getByRole('img', { name: 'User' })).toBeVisible();
    await expect(this.page.getByText('Loading...')).toBeVisible();
    await expect(this.page).toHaveURL(/\/$/);
  }

  async verifyLoggedOut() {
    await expect(this.signInButton).toBeVisible();
    await expect(this.page).toHaveURL(/\/signin/);
  }
}
