import { test, expect } from '@playwright/test';

// Create a dedicated test file for authentication
test.describe('Authentication System', () => {
  // Use test.use to set up authentication state for the suite
  test.use({
    storageState: 'tests/.auth/auth.json',
  });

  test.beforeEach(async ({ page }) => {
    // Set up common test state
    await page.goto('http://localhost:5173/signin');
  });

  test('should display sign in form with proper UI elements', async ({ page }) => {
    // Test UI elements using semantic locators
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByPlaceholder('Enter your email or username')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
  });

  test('should navigate to register page when clicking create account', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Account' }).click();
    await expect(page).toHaveURL(/register/);
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    // Fill form and submit
    await page.getByPlaceholder('Enter your email or username').fill('invalid@example.com');
    await page.getByPlaceholder('Enter your password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify error message
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should sign in successfully with email', async ({ page }) => {
    // Fill form with valid credentials
    await page.getByPlaceholder('Enter your email or username').fill('333@yahoo.com');
    await page.getByPlaceholder('Enter your password').fill('333333');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify successful navigation
    await expect(page).toHaveURL('/');
  });

  test('should sign in successfully with username', async ({ page }) => {
    // Fill form with username
    await page.getByPlaceholder('Enter your email or username').fill('333');
    await page.getByPlaceholder('Enter your password').fill('333333');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify successful navigation
    await expect(page).toHaveURL('/');
  });

  test('should show error for non-existent username', async ({ page }) => {
    // Attempt to sign in with non-existent username
    await page.getByPlaceholder('Enter your email or username').fill('nonexistentuser');
    await page.getByPlaceholder('Enter your password').fill('333333');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify error message
    await expect(page.getByText('Username not found')).toBeVisible();
  });

  test('should sign up new user successfully', async ({ page }) => {
    // Navigate to register page
    await page.getByRole('link', { name: 'Create Account' }).click();

    // Fill registration form
    await page.getByPlaceholder('Enter your email').fill('newuser@example.com');
    await page.getByPlaceholder('Enter your password').fill('password123');
    await page.getByPlaceholder('Enter your username').fill('newuser123');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Verify successful navigation
    await expect(page).toHaveURL('/');
  });

  test('should verify sign in form UI elements', async ({ page }) => {
    // Test UI elements using semantic locators
    await expect(page.getByPlaceholder('Enter your email or username')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
  });

  test('should show error for duplicate username during registration', async ({ page }) => {
    // Navigate to register page
    await page.getByRole('link', { name: 'Create Account' }).click();

    // Attempt to register with existing username
    await page.getByPlaceholder('Enter your email').fill('existing@example.com');
    await page.getByPlaceholder('Enter your password').fill('password123');
    await page.getByPlaceholder('Enter your username').fill('existinguser');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Verify error message
    await expect(page.getByText('Username already taken')).toBeVisible();
  });

  test('should sign out successfully', async ({ page }) => {
    // Simulate being logged in
    await page.goto('http://localhost:5173/');

    // Click sign out (assuming it's in the header)
    await page.getByRole('button', { name: 'Sign Out' }).click();

    // Verify redirection to sign in page
    await expect(page).toHaveURL('/signin');
  });
});
