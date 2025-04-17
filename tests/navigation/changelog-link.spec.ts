import { test, expect } from '@playwright/test';

// E2E: Header navigation includes Changelog link below Documentation, navigates to /changelog

test.describe('Header Navigation: Changelog Link', () => {
  test('should display Changelog link below Documentation and navigate correctly', async ({ page }) => {
    // Visit the home page
    await page.goto('/');

    // Find the Documentation link
    const docLink = page.getByRole('link', { name: /documentation/i });
    await expect(docLink).toBeVisible();

    // Find the Changelog link (should be after Documentation)
    const changelogLink = page.getByRole('link', { name: /changelog/i });
    await expect(changelogLink).toBeVisible();

    // Ensure Changelog link appears after Documentation in the DOM
    const docHandle = await docLink.elementHandle();
    const changelogHandle = await changelogLink.elementHandle();
    const docIndex = await docHandle?.evaluate((el) => Array.from(el.parentNode?.children ?? []).indexOf(el));
    const changelogIndex = await changelogHandle?.evaluate((el) => Array.from(el.parentNode?.children ?? []).indexOf(el));
    expect(changelogIndex).toBeGreaterThan(docIndex ?? -1);

    // Click the Changelog link
    await changelogLink.click();

    // Should navigate to /changelog
    await expect(page).toHaveURL(/\/changelog$/i);

    // The changelog page should have a heading or content
    const heading = page.getByRole('heading', { name: /changelog/i });
    await expect(heading).toBeVisible();
  });
});
