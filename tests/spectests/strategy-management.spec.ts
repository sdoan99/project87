import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import { AuthPage } from '../pages/AuthPage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, '.auth/auth.json');

test.describe('Strategy Management', () => {
  test.use({ storageState: authFile });

  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto('/strategy');
  });

  test.describe('Strategy Creation', () => {
    test('should create a new public strategy', async ({ page }) => {
      // Navigate to create page
      await page.getByRole('link', { name: 'Create Strategy' }).click();

      // Fill in strategy details
      await page.getByLabel('Strategy Name').fill('Test Public Strategy');
      await page.getByLabel('Strategy Description').fill('A test strategy description');

      // Select market type
      await page.getByLabel('Stocks & Equities').check();

      // Select category
      await page.getByLabel('Technical Indicators').check();

      // Select timeframe
      await page.getByLabel('Daily').check();

      // Ensure it's public (default is public)
      await expect(page.getByRole('switch', { name: 'Public visibility' })).toBeChecked();

      // Submit form
      await page.getByRole('button', { name: 'Create Strategy' }).click();

      // Verify redirect and strategy appears in list
      await expect(page).toHaveURL('/strategy');
      await expect(page.getByText('Test Public Strategy')).toBeVisible();
    });

    test('should create a new private strategy', async ({ page }) => {
      await page.getByRole('link', { name: 'Create Strategy' }).click();

      // Fill in strategy details
      await page.getByLabel('Strategy Name').fill('Test Private Strategy');
      await page.getByLabel('Strategy Description').fill('A private test strategy');

      // Make it private
      await page.getByRole('switch', { name: 'Public visibility' }).click();
      await expect(page.getByRole('switch', { name: 'Public visibility' })).not.toBeChecked();

      // Select required fields
      await page.getByLabel('Cryptocurrency').check();
      await page.getByLabel('Chart Pattern').check();
      await page.getByLabel('4 Hour').check();

      // Submit form
      await page.getByRole('button', { name: 'Create Strategy' }).click();

      // Verify redirect and strategy appears in list
      await expect(page).toHaveURL('/strategy');
      await expect(page.getByText('Test Private Strategy')).toBeVisible();
    });

    test('should show validation errors', async ({ page }) => {
      await page.getByRole('link', { name: 'Create Strategy' }).click();

      // Try to submit without required fields
      await page.getByRole('button', { name: 'Create Strategy' }).click();

      // Verify error messages
      await expect(page.getByText('Strategy name is required')).toBeVisible();

      // Fill name only
      await page.getByLabel('Strategy Name').fill('Test Strategy');
      await page.getByRole('button', { name: 'Create Strategy' }).click();

      // Verify market validation
      await expect(page.getByText('Please select at least one market')).toBeVisible();
    });
  });

  test.describe('Strategy Editing', () => {
    test('should edit an existing strategy', async ({ page }) => {
      // Click edit on the first strategy
      await page.getByRole('button', { name: 'Edit strategy' }).first().click();

      // Update strategy details
      await page.getByLabel('Strategy Name').fill('Updated Strategy Name');
      await page.getByLabel('Strategy Description').fill('Updated description');

      // Update market selection
      await page.getByLabel('Forex').check();

      // Save changes
      await page.getByRole('button', { name: 'Save Changes' }).click();

      // Verify updates
      await expect(page).toHaveURL('/strategy');
      await expect(page.getByText('Updated Strategy Name')).toBeVisible();
    });
  });

  test.describe('Strategy Filtering and Sorting', () => {
    test('should filter strategies by market type', async ({ page }) => {
      await page.getByRole('combobox', { name: 'Market Type' }).selectOption('Cryptocurrency');
      await expect(page.getByTestId('strategy-table')).toContainText('Cryptocurrency');
    });

    test('should filter strategies by category', async ({ page }) => {
      await page.getByRole('combobox', { name: 'Category' }).selectOption('Technical Indicators');
      await expect(page.getByTestId('strategy-table')).toContainText('Technical Indicators');
    });

    test('should sort strategies by performance', async ({ page }) => {
      // Click performance header to sort
      await page.getByRole('columnheader', { name: 'Performance' }).click();
      
      // Get performance values
      const performanceValues = await page.getByTestId('performance-value').allTextContents();
      
      // Verify sorting (assuming descending order first)
      const sortedValues = [...performanceValues].sort((a, b) => 
        parseFloat(b.replace('%', '')) - parseFloat(a.replace('%', ''))
      );
      expect(performanceValues).toEqual(sortedValues);
    });
  });

  test.describe('Strategy Visibility', () => {
    test('should toggle strategy visibility', async ({ page }) => {
      // Find first public strategy
      await page.getByRole('button', { name: 'Edit strategy' }).first().click();
      
      // Toggle visibility
      await page.getByRole('switch', { name: 'Public visibility' }).click();
      
      // Save changes
      await page.getByRole('button', { name: 'Save Changes' }).click();
      
      // Verify visibility icon changed
      await expect(page.getByTestId('private-indicator')).toBeVisible();
    });
  });

  test.describe('Strategy Performance Tracking', () => {
    test('should display strategy performance metrics', async ({ page }) => {
      // Click on a strategy to view details
      await page.getByRole('link', { name: 'View strategy details' }).first().click();

      // Verify performance metrics are visible
      await expect(page.getByTestId('win-rate')).toBeVisible();
      await expect(page.getByTestId('profit-factor')).toBeVisible();
      await expect(page.getByTestId('max-drawdown')).toBeVisible();
      await expect(page.getByTestId('total-trades')).toBeVisible();
    });

    test('should update performance metrics after new trade', async ({ page }) => {
      // Navigate to strategy details
      await page.getByRole('link', { name: 'View strategy details' }).first().click();

      // Get initial metrics
      const initialWinRate = await page.getByTestId('win-rate').textContent() || '';

      // Add a new winning trade
      await page.getByRole('button', { name: 'Add Trade' }).click();
      await page.getByLabel('Result').selectOption('Win');
      await page.getByRole('button', { name: 'Save Trade' }).click();

      // Verify metrics updated
      await expect(page.getByTestId('win-rate')).not.toHaveText(initialWinRate);
    });
  });
});
