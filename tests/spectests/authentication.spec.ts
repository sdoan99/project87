import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';

test.describe('Authentication System', () => {
  let authPage: AuthPage;
  const testEmail = '000@yahoo.com';
  const testPassword = '000000';
  const testPasswordConfirmation = '000000';


  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    authPage = new AuthPage(page);
  });

  test.describe('User Registration', () => {
    test('should successfully register a new user', async () => {
      await authPage.register(testUsername, testEmail, testPassword, testPasswordConfirmation);
      await expect(authPage.successMessage).toBeVisible({ timeout: 10000 });
      await authPage.verifyLoggedIn();
    }, 30000);

    test('should show error for invalid username format', async () => {
      await authPage.register('invalid username', testEmail, testPassword, testPasswordConfirmation);
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });
    }, 30000);

    test('should show error for invalid email format', async () => {
      await authPage.register(testUsername, 'invalid-email', testPassword, testPasswordConfirmation);
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });
    }, 30000);

    test('should show error for weak password', async () => {
      await authPage.register(testUsername, testEmail, 'weak', 'weak');
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });
    }, 30000);

    test('should show error for mismatched password confirmation', async () => {
      await authPage.register(testUsername, testEmail, testPassword, 'wrong-confirmation');
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });
    }, 30000);
  });

  test.describe('User Login/Logout', () => {
    test('should successfully login and logout', async () => {
      // Login with email
      await authPage.login(testEmail, testPassword);
      await authPage.verifyLoggedIn();
      
      await authPage.logout();
      await authPage.verifyLoggedOut();

      // Login with username
      await authPage.login(testUsername, testPassword);
      await authPage.verifyLoggedIn();
      
      await authPage.logout();
      await authPage.verifyLoggedOut();
    }, 30000);

    test('should show error for incorrect credentials', async () => {
      // Incorrect password with email
      await authPage.login(testEmail, 'wrongpassword');
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });

      // Incorrect password with username
      await authPage.login(testUsername, 'wrongpassword');
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });

      // Non-existent email
      await authPage.login('nonexistent@example.com', testPassword);
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });

      // Non-existent username
      await authPage.login('nonexistent', testPassword);
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });
    }, 30000);

    test('should maintain session after page reload', async ({ page }) => {
      await authPage.login(testEmail, testPassword);
      await page.reload();
      await authPage.verifyLoggedIn();
    }, 30000);
  });

  test.describe('Password Reset', () => {
    test('should send password reset email', async () => {
      await authPage.requestPasswordReset(testEmail);
      await expect(authPage.successMessage).toBeVisible({ timeout: 10000 });
    }, 30000);

    test('should show error for non-existent email', async () => {
      await authPage.requestPasswordReset('nonexistent@example.com');
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });
    }, 30000);
  });

  test.describe('Profile Management', () => {
    test('should update user profile', async () => {
      await authPage.login(testEmail, testPassword);
      await authPage.updateProfile({ name: 'Test User' });
      await expect(authPage.successMessage).toBeVisible({ timeout: 10000 });
    }, 30000);

    test('should validate email format when updating profile', async () => {
      await authPage.login(testEmail, testPassword);
      await authPage.updateProfile({ email: 'invalid-email' });
      await expect(authPage.errorMessage).toBeVisible({ timeout: 10000 });
    }, 30000);
  });

  test.describe('Session Management', () => {
    test('should handle expired sessions', async ({ page }) => {
      await authPage.login(testEmail, testPassword);
      
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      
      await authPage.verifyLoggedOut();
    }, 30000);

    test('should handle concurrent sessions', async ({ browser }) => {
      const context1 = await browser.newContext();
      const page1 = await context1.newPage();
      const auth1 = new AuthPage(page1);
      await auth1.login(testEmail, testPassword);
      await auth1.verifyLoggedIn();

      const context2 = await browser.newContext();
      const page2 = await context2.newPage();
      const auth2 = new AuthPage(page2);
      await auth2.login(testEmail, testPassword);
      await auth2.verifyLoggedIn();

      await auth1.logout();
      await auth1.verifyLoggedOut();

      await auth2.verifyLoggedIn();
    }, 60000);
  });
});
