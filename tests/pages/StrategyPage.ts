import { type Page, type Locator, expect } from '@playwright/test';

export class StrategyPage {
  readonly page: Page;
  // Form fields
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  // Privacy buttons
  readonly publicButton: Locator;
  readonly privateButton: Locator;
  // Table
  readonly table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.descriptionInput = page.locator('#description');
    this.publicButton = page.getByRole('button', { name: 'Public' });
    this.privateButton = page.getByRole('button', { name: 'Private' });
    this.table = page.locator('table');
  }

  async gotoStrategyList() {
    await this.page.goto('http://localhost:5173/strategy');
  }

  async gotoCreateStrategy() {
    await this.page.click('text=Create and Share Strategies');
    await expect(this.page).toHaveURL(/\/create/);
  }

  async fillStrategyForm({
    name,
    description,
    markets,
    categories,
    timeframes,
    isPublic,
  }: {
    name: string;
    description: string;
    markets: string[];
    categories: string[];
    timeframes: string[];
    isPublic: boolean;
  }) {
    if (isPublic) {
      await this.publicButton.click();
    } else {
      await this.privateButton.click();
    }
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    for (const market of markets) {
      await this.page.check(`input[id="market-${market}"]`);
    }
    for (const category of categories) {
      await this.page.check(`input[id="category-${category}"]`);
    }
    for (const timeframe of timeframes) {
      await this.page.check(`input[id="timeframe-${timeframe}"]`);
    }
  }

  async submitStrategy() {
    await this.page.click('button:has-text("Create Strategy")');
    // Wait for either navigation or error message
    try {
      await expect(this.page).toHaveURL(/\/strategy/, { timeout: 5000 });
    } catch (e) {
      // Check for error message
      // Try several selectors for error banner
      let errorBanner = this.page.locator('[role="alert"]');
      if (!(await errorBanner.isVisible())) {
        errorBanner = this.page.locator('.text-red-500');
      }
      if (!(await errorBanner.isVisible())) {
        errorBanner = this.page.getByText(/error|required|must/i);
      }
      if (await errorBanner.isVisible()) {
        const errorText = await errorBanner.textContent();
        throw new Error('Strategy creation failed: ' + errorText);
      } else {
        throw new Error('Strategy creation failed and no error message was found.');
      }
    }
  }

  async assertStrategyInTable(name: string) {
    await expect(this.table).toContainText(name);
  }

  async filterBy(filter: string) {
    await this.page.click(`button:has-text("${filter}")`);
    await expect(this.table).toBeVisible();
  }

  async sortBy(header: string) {
    await this.page.click(`th:has-text("${header}")`);
  }

  async assertMetricsPresent(name: string) {
    const row = this.page.locator('table tr', { hasText: name });
    await expect(row).toBeVisible();
    await expect(row).toContainText('PNL');
    await expect(row).toContainText('%');
  }
}
