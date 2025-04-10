import { type Page, type Locator, expect } from '@playwright/test';

export class StrategyPage {
  readonly page: Page;
  // Navigation
  readonly createStrategyLink: Locator;
  // Form inputs
  readonly strategyNameInput: Locator;
  readonly strategyDescriptionInput: Locator;
  readonly publicVisibilityToggle: Locator;
  // Market selectors
  readonly marketCheckboxes: Record<string, Locator>;
  // Category selectors
  readonly categoryCheckboxes: Record<string, Locator>;
  // Timeframe selectors
  readonly timeframeCheckboxes: Record<string, Locator>;
  // Buttons
  readonly createButton: Locator;
  readonly saveChangesButton: Locator;
  readonly editStrategyButton: Locator;
  readonly addTradeButton: Locator;
  // Filters and sorting
  readonly marketTypeFilter: Locator;
  readonly categoryFilter: Locator;
  readonly performanceHeader: Locator;
  // Strategy table
  readonly strategyTable: Locator;
  readonly privateIndicator: Locator;
  // Performance metrics
  readonly winRateMetric: Locator;
  readonly profitFactorMetric: Locator;
  readonly maxDrawdownMetric: Locator;
  readonly totalTradesMetric: Locator;
  // Messages
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.createStrategyLink = page.getByRole('link', { name: 'Create Strategy' });
    
    // Form inputs
    this.strategyNameInput = page.getByLabel('Strategy Name');
    this.strategyDescriptionInput = page.getByLabel('Strategy Description');
    this.publicVisibilityToggle = page.getByRole('switch', { name: 'Public visibility' });
    
    // Market checkboxes
    this.marketCheckboxes = {
      'Stocks & Equities': page.getByLabel('Stocks & Equities'),
      'Options & Derivatives': page.getByLabel('Options & Derivatives'),
      'Cryptocurrency': page.getByLabel('Cryptocurrency'),
      'Forex': page.getByLabel('Forex'),
      'Sports Analytics': page.getByLabel('Sports Analytics'),
      'Alternatives': page.getByLabel('Alternatives')
    };

    // Category checkboxes
    this.categoryCheckboxes = {
      'Trend Analysis': page.getByLabel('Trend Analysis'),
      'Harmonic Pattern': page.getByLabel('Harmonic Pattern'),
      'Chart Pattern': page.getByLabel('Chart Pattern'),
      'Technical Indicators': page.getByLabel('Technical Indicators'),
      'Wave Analysis': page.getByLabel('Wave Analysis'),
      'Gann': page.getByLabel('Gann'),
      'Fundamental Analysis': page.getByLabel('Fundamental Analysis'),
      'Beyond Technical Analysis': page.getByLabel('Beyond Technical Analysis')
    };

    // Timeframe checkboxes
    this.timeframeCheckboxes = {
      '1 Minute': page.getByLabel('1 Minute'),
      '5 Minutes': page.getByLabel('5 Minutes'),
      '15 Minutes': page.getByLabel('15 Minutes'),
      '1 Hour': page.getByLabel('1 Hour'),
      '4 Hour': page.getByLabel('4 Hour'),
      'Daily': page.getByLabel('Daily'),
      'Weekly': page.getByLabel('Weekly'),
      'Monthly': page.getByLabel('Monthly'),
      'Longterm Buy': page.getByLabel('Longterm Buy')
    };

    // Buttons
    this.createButton = page.getByRole('button', { name: 'Create Strategy' });
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
    this.editStrategyButton = page.getByRole('button', { name: 'Edit strategy' });
    this.addTradeButton = page.getByRole('button', { name: 'Add Trade' });

    // Filters and sorting
    this.marketTypeFilter = page.getByRole('combobox', { name: 'Market Type' });
    this.categoryFilter = page.getByRole('combobox', { name: 'Category' });
    this.performanceHeader = page.getByRole('columnheader', { name: 'Performance' });

    // Strategy table
    this.strategyTable = page.getByTestId('strategy-table');
    this.privateIndicator = page.getByTestId('private-indicator');

    // Performance metrics
    this.winRateMetric = page.getByTestId('win-rate');
    this.profitFactorMetric = page.getByTestId('profit-factor');
    this.maxDrawdownMetric = page.getByTestId('max-drawdown');
    this.totalTradesMetric = page.getByTestId('total-trades');

    // Messages
    this.errorMessage = page.getByRole('alert');
  }

  async goto(pagePath: string) {
    await this.page.goto(`http://localhost:5173${pagePath}`);
  }

  async createStrategy({
    name,
    description,
    isPublic = true,
    markets = ['Stocks & Equities'],
    categories = ['Technical Indicators'],
    timeframes = ['Daily']
  }: {
    name: string;
    description: string;
    isPublic?: boolean;
    markets?: string[];
    categories?: string[];
    timeframes?: string[];
  }) {
    await this.createStrategyLink.click();
    await this.strategyNameInput.fill(name);
    await this.strategyDescriptionInput.fill(description);

    if (!isPublic) {
      await this.publicVisibilityToggle.click();
    }

    // Select markets
    for (const market of markets) {
      await this.marketCheckboxes[market].check();
    }

    // Select categories
    for (const category of categories) {
      await this.categoryCheckboxes[category].check();
    }

    // Select timeframes
    for (const timeframe of timeframes) {
      await this.timeframeCheckboxes[timeframe].check();
    }

    await this.createButton.click();
  }

  async editStrategy({
    name,
    description,
    isPublic,
    markets,
    categories,
    timeframes
  }: {
    name?: string;
    description?: string;
    isPublic?: boolean;
    markets?: string[];
    categories?: string[];
    timeframes?: string[];
  }) {
    await this.editStrategyButton.first().click();

    if (name) await this.strategyNameInput.fill(name);
    if (description) await this.strategyDescriptionInput.fill(description);
    if (typeof isPublic === 'boolean') {
      const isCurrentlyPublic = await this.publicVisibilityToggle.isChecked();
      if (isPublic !== isCurrentlyPublic) {
        await this.publicVisibilityToggle.click();
      }
    }

    if (markets) {
      for (const market of markets) {
        await this.marketCheckboxes[market].check();
      }
    }

    if (categories) {
      for (const category of categories) {
        await this.categoryCheckboxes[category].check();
      }
    }

    if (timeframes) {
      for (const timeframe of timeframes) {
        await this.timeframeCheckboxes[timeframe].check();
      }
    }

    await this.saveChangesButton.click();
  }

  async filterByMarket(market: string) {
    await this.marketTypeFilter.selectOption(market);
  }

  async filterByCategory(category: string) {
    await this.categoryFilter.selectOption(category);
  }

  async sortByPerformance() {
    await this.performanceHeader.click();
  }

  async addTrade(result: 'Win' | 'Loss') {
    await this.addTradeButton.click();
    await this.page.getByLabel('Result').selectOption(result);
    await this.page.getByRole('button', { name: 'Save Trade' }).click();
  }

  async expectStrategyExists(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectPrivateIndicatorVisible() {
    await expect(this.privateIndicator).toBeVisible();
  }

  async expectPerformanceMetricsVisible() {
    await expect(this.winRateMetric).toBeVisible();
    await expect(this.profitFactorMetric).toBeVisible();
    await expect(this.maxDrawdownMetric).toBeVisible();
    await expect(this.totalTradesMetric).toBeVisible();
  }
}
