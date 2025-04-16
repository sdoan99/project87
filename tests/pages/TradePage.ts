import { Page, Locator, expect } from '@playwright/test';

interface TradePayload {
  symbol: string;
  quantity: string;
  price: string;
}

export class TradePage {
  readonly page: Page;
  readonly tradeForm: Locator;
  readonly submitTradeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tradeForm = page.locator('[data-testid="trade-form"]');
    this.submitTradeBtn = page.locator('[data-testid="submit-trade"]');
  }

  async createTrade(payload: TradePayload) {
    await this.tradeForm.locator('input[name="symbol"]').fill(payload.symbol);
    await this.tradeForm.locator('input[name="quantity"]').fill(payload.quantity);
    await this.tradeForm.locator('input[name="price"]').fill(payload.price);
    await this.submitTradeBtn.click();
  }

  async addAction(payload: TradePayload, index: number) {
    await this.page.locator(`[data-testid="add-action-btn-${index}"]`).click();
    const actionRow = this.page.locator(`[data-testid="trade-action-row-${index}"]`);
    await actionRow.locator('input[name="symbol"]').fill(payload.symbol);
    await actionRow.locator('input[name="quantity"]').fill(payload.quantity);
    await actionRow.locator('input[name="price"]').fill(payload.price);
  }

  async removeAction(index: number) {
    await this.page.locator(`[data-testid="remove-action-btn-${index}"]`).click();
  }

  async editTrade(symbol: string, newQuantity: string) {
    const row = this.page.locator(`[data-testid="trade-row-${symbol}"]`);
    await row.locator('button[data-testid="edit-trade"]').click();
    await row.locator('input[name="quantity"]').fill(newQuantity);
    await row.locator('button[data-testid="save-trade"]').click();
  }

  async deleteTrade(symbol: string) {
    const row = this.page.locator(`[data-testid="trade-row-${symbol}"]`);
    await row.locator('button[data-testid="delete-trade"]').click();
  }

  async assertTradeVisible(symbol: string) {
    await expect(this.page.locator(`[data-testid="trade-row-${symbol}"]`)).toBeVisible();
  }

  async assertTradeNotVisible(symbol: string) {
    await expect(this.page.locator(`[data-testid="trade-row-${symbol}"]`)).not.toBeVisible();
  }

  async assertValidationError() {
    await expect(this.page.locator('[data-testid="trade-error"]')).toBeVisible();
  }

  async assertTotal(total: string) {
    await expect(this.page.locator('[data-testid="trade-total"]')).toHaveText(total);
  }

  async assertMetricsUpdated() {
    await expect(this.page.locator('[data-testid="performance-metrics"]')).toBeVisible();
  }
}
