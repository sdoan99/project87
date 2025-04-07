# Playwright Testing Guidelines

## Test Structure and Organization
- Store all tests under the `tests/` folder
- Name test files based on the system component being tested (conceptual, not React component)
- Group related tests within a single file using `test.describe` blocks
- Use descriptive test names that explain the functionality being tested
- use `test.use({storageState: ...})` for setting auth state across all test in the suite

## Locator Strategy
1. Prefer `getByRole` locators for best accessibility and resilience
2. Use other semantic locators like `getByText`, `getByLabel`, `getByPlaceholder` when appropriate
3. Avoid test IDs unless absolutely necessary

## Writing Tests
- Focus on testing user-visible behavior, not implementation details
- Ensure tests are reproducible and isolated
- Use `test.beforeEach()` for common setup steps
- Avoid sharing state between tests
- Minimize use of `page.evaluate()` - prefer Playwright's built-in methods

## Assertions
- Use web-first assertions (e.g., `expect(locator).toBeVisible()`)
- Prefer assertions that automatically wait and retry (e.g., `toHaveText()` over `textContent()`)
- Use soft assertions for non-critical checks that shouldn't fail the entire test

## Handling Asynchronous Operations
- Always use `await` with Playwright async methods
- Leverage Playwright's auto-waiting instead of explicit waits
- Use `waitFor` functions for complex conditions

## Test Data Management
- Use dynamic test data generation when possible
- Avoid hardcoding test data directly in tests
- Consider using test fixtures for complex data setup

## Performance and Stability
- Keep tests focused and concise
- Avoid unnecessary actions or assertions
- Use `test.slow()` for tests that are inherently slow
- Implement retry logic for potentially flaky tests

## Cross-browser Testing
- Use `test.describe.configure({ mode: 'parallel' })` for parallel execution
- Test critical paths across multiple browsers using `playwright.config.js`

## Debugging and Maintenance
- Use `test.only()` for focusing on specific tests during development
- Leverage Playwright's tracing and video recording for debugging
- Add comments for complex test scenarios or setup

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