import { test, expect } from '@playwright/test';

test('test clerk login with email', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Email address or username' }).click();
  await page
    .getByRole('textbox', { name: 'Email address or username' })
    .fill('bertha.biohealth@gmail.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('DRTRTuw45$%&4357u445ywADH');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Open user button' }).click();
  await page.locator('main').click();
});

test('test clerk login with sso', async ({ page }) => {});

test('test clerk login with wallet', async ({ page }) => {});
