# Playwright E2E Testing Guidelines

## Test Structure and Organization
- Store all tests under the `tests/` folder
- Name test files based on the system component or feature being tested (not just React component)
- Group related tests within a single file using `test.describe` blocks
- Use descriptive test names that explain the functionality being tested
- Use `test.use({storageState: ...})` for setting auth state across all tests in the suite
- For each new user-facing feature, create or update an E2E test covering both happy and edge/error paths
- Tests must cover all critical flows: authentication, strategy management, trade management, data visualization
- Tests should be reviewed for selector robustness, coverage, and reliability before merging

## Locator Strategy
1. Prefer `getByRole` locators for best accessibility and resilience
2. Use other semantic locators like `getByText`, `getByLabel`, `getByPlaceholder` when appropriate
3. Avoid test IDs unless absolutely necessary; if an element is not easily selectable by role, label, or text, add a `data-testid` or improve its accessibility
4. All interactive elements in the app must have accessible roles and names for robust E2E testing

## Writing Tests
- Focus on testing user-visible behavior, not implementation details—simulate real user interactions
- Ensure tests are reproducible and isolated
- Use `test.beforeEach()` for common setup steps
- Avoid sharing state between tests
- Minimize use of `page.evaluate()`—prefer Playwright's built-in methods
- For authenticated flows, use Playwright’s `storageState` with Supabase auth (see Supabase Auth section below)
- For multi-step flows (e.g., strategy creation), verify both UI changes and backend state (via API or DB if possible)

## Assertions
- Use web-first assertions (e.g., `expect(locator).toBeVisible()`)
- Prefer assertions that automatically wait and retry (e.g., `toHaveText()` over `textContent()`)
- Use soft assertions for non-critical checks that shouldn't fail the entire test
- Always assert both the presence and correctness of critical data (e.g., strategy name, trade metrics, chart rendering)
- For error boundaries, assert that user-friendly error messages are shown when simulating failures

## Handling Asynchronous Operations
- Always use `await` with Playwright async methods
- Leverage Playwright's auto-waiting and web assertions; avoid `waitForTimeout` unless absolutely necessary
- Use `waitFor` functions for complex conditions

## Test Data Management
- Use dynamic test data generation when possible
- Avoid hardcoding test data directly in tests or hardcoding secrets/credentials
- Use test fixtures to create test users, strategies, and trades
- Clean up test data after each test when possible

## Performance and Stability
- Keep tests focused and concise
- Avoid unnecessary actions or assertions
- Use `test.slow()` for tests that are inherently slow
- Implement retry logic for potentially flaky tests
- Run E2E tests in CI on multiple browsers (Chromium, Firefox at minimum)
- Test on mobile and desktop viewports using Playwright’s device emulation

## Cross-browser & Device Testing
- Use `test.describe.configure({ mode: 'parallel' })` for parallel execution
- Test critical paths across multiple browsers using `playwright.config.js`
- Test on both desktop and mobile using Playwright device emulation

## Debugging and Maintenance
- Use `test.only()` for focusing on specific tests during development
- Leverage Playwright's tracing and video recording for debugging
- Add comments for complex test scenarios or setup
- Review new E2E tests for selector quality, coverage (happy and edge/error paths), and reliability

## Project-Specific E2E Scenarios

- User authentication: signup, login, logout
- Strategy creation, editing, deletion, and visibility toggling (public/private)
- Trade creation with multiple actions and atomic updates
- Performance metrics display and update
- Data visualization (charts, interactive elements)
- Permissions: ensure private data is not visible to unauthorized users
- Error handling: simulate API/network failures and assert error boundaries

## Supabase Auth & Backend Verification

- Use `test.use({ storageState: 'path/to/auth.json' })` to run tests as an authenticated user.
- Generate `storageState` via Playwright setup or Supabase CLI.
- After UI actions (e.g., creating a strategy), verify the backend state via Supabase REST API or direct DB query if possible.

## E2E Test Review Checklist

- [ ] Selectors are robust and accessible
- [ ] Test covers both happy and edge/error cases
- [ ] Test data is cleaned up after test
- [ ] Assertions are specific and meaningful
- [ ] Test passes reliably in CI and on multiple browsers/devices

## Example Test Structure
```typescript
import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/auth.json');

test.describe('Todo List', () => {
    test.use({ storageState: authFile });
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc');
    });
    test('should add a new todo item', async ({ page }) => {
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('New todo item');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await expect(page.getByRole('listitem')).toHaveCount(1);
        await expect(page.getByRole('listitem').first()).toHaveText('New todo item');
    });
    test('should mark a todo as completed', async ({ page }) => {
        // Add a todo item
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task to complete');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        // Mark it as completed
        await page.getByRole('checkbox', { name: 'Task to complete' }).check();
        // Assert it's marked as completed
        await expect(page.getByRole('listitem').first()).toHaveClass(/completed/);
    });
});
```