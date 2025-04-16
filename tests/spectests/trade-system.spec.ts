import { test, expect } from '@playwright/test';
import { TradePage } from '../pages/TradePage';

const STORAGE_STATE_PATH = 'tests/.auth/auth.json';

test.use({ storageState: STORAGE_STATE_PATH });

test.describe('Trading System', () => {
  let tradePage: TradePage;

  test('should navigate to performance page when first strategy is clicked', async ({ page }) => {
    await page.goto('/strategy');
    await page.waitForSelector('table tbody tr td a');
    const firstStrategy = page.locator('table tbody tr td a').first();
    await firstStrategy.click();
    await page.waitForSelector('[class*=w-\\[320px\\]]');
    await expect(page).toHaveURL(/\/performance\//);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/strategy');
    // Click first strategy to navigate to performance page
    await page.waitForSelector('table tbody tr td a');
    const firstStrategy = page.locator('table tbody tr td a').first();
    await firstStrategy.click();
    await page.waitForSelector('[class*=w-\\[320px\\]]');
    await expect(page).toHaveURL(/\/performance\//);
    tradePage = new TradePage(page);
  });

  test('should create and submit a valid trade', async ({ page }) => {
    await tradePage.openTradeForm();
    await tradePage.createTrade({ symbol: 'AAPL', quantity: '10', price: '150' });
    await tradePage.assertTradeVisible('AAPL');
  });

  test('should validate trade form fields', async () => {
    await tradePage.createTrade({ symbol: '', quantity: '10', price: '150' });
    await tradePage.assertValidationError();
    await tradePage.createTrade({ symbol: 'AAPL', quantity: '-5', price: '150' });
    await tradePage.assertValidationError();
  });

  test('should handle multi-action trades', async () => {
    await tradePage.createTrade({ symbol: 'MSFT', quantity: '5', price: '300' });
    await tradePage.addAction({ symbol: 'GOOG', quantity: '2', price: '2500' }, 1);
    await tradePage.submitTradeBtn.click();
    await tradePage.assertTradeVisible('MSFT');
    await tradePage.assertTradeVisible('GOOG');
    // Remove an action and submit again
    await tradePage.editTrade('MSFT', '5');
    await tradePage.removeAction(1);
    await tradePage.submitTradeBtn.click();
    await tradePage.assertTradeVisible('GOOG');
    await tradePage.assertTradeNotVisible('MSFT');
  });

  test('should auto-calculate trade totals', async () => {
    await tradePage.createTrade({ symbol: 'TEST', quantity: '3', price: '100' });
    await tradePage.assertTotal('300');
    await tradePage.tradeForm.locator('input[name="price"]').fill('200');
    await tradePage.assertTotal('600');
  });

  test('should display, update, and delete trades in the table', async () => {
    await tradePage.createTrade({ symbol: 'TSLA', quantity: '1', price: '800' });
    await tradePage.assertTradeVisible('TSLA');
    // Edit
    await tradePage.editTrade('TSLA', '2');
    await tradePage.assertTradeVisible('TSLA');
    // Delete
    await tradePage.deleteTrade('TSLA');
    await tradePage.assertTradeNotVisible('TSLA');
  });

  test('should update performance metrics after trades', async () => {
    await tradePage.createTrade({ symbol: 'NFLX', quantity: '4', price: '400' });
    await tradePage.assertMetricsUpdated();
  });
});
