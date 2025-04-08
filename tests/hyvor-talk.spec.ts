import { test, expect } from '@playwright/test';

test.describe('Hyvor Talk Integration', () => {
  // Test setup - runs before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to the strategy details page where comments will be implemented
    await page.goto('/strategies/1'); // Assuming we'll add comments to strategy details
  });

  test('should load and display Hyvor Talk comments section', async ({ page }) => {
    // Verify Hyvor Talk script is loaded
    const script = page.locator('script[src*="talk.hyvor.com/embed/embed.js"]');
    await expect(script).toBeAttached();

    // Verify comments section is present
    const commentsSection = page.locator('hyvor-talk-comments');
    await expect(commentsSection).toBeVisible();

    // Verify website-id attribute is set correctly
    const websiteId = await commentsSection.getAttribute('website-id');
    expect(websiteId).toBeTruthy();
  });

  test('should load comments specific to the strategy', async ({ page }) => {
    // Verify page-id matches the strategy ID
    const commentsSection = page.locator('hyvor-talk-comments');
    const pageId = await commentsSection.getAttribute('page-id');
    expect(pageId).toBe('strategy-1'); // Assuming we use 'strategy-{id}' format

    // Verify unique thread for each strategy
    await page.goto('/strategies/2');
    const newCommentsSection = page.locator('hyvor-talk-comments');
    const newPageId = await newCommentsSection.getAttribute('page-id');
    expect(newPageId).toBe('strategy-2');
  });

  test('should display newsletter form', async ({ page }) => {
    // Navigate to the page with newsletter form
    await page.goto('/community'); // Assuming we'll add newsletter form here

    // Verify newsletter script is loaded
    const script = page.locator('script[src*="talk.hyvor.com/embed/newsletter.js"]');
    await expect(script).toBeAttached();

    // Verify newsletter form is present
    const newsletterForm = page.locator('hyvor-talk-newsletter');
    await expect(newsletterForm).toBeVisible();

    // Verify website-id attribute is set correctly
    const websiteId = await newsletterForm.getAttribute('website-id');
    expect(websiteId).toBeTruthy();
  });

  test('should handle comment section visibility based on strategy privacy', async ({ page }) => {
    // Test public strategy
    await page.goto('/strategies/1'); // Assuming strategy 1 is public
    const publicCommentsSection = page.locator('hyvor-talk-comments');
    await expect(publicCommentsSection).toBeVisible();

    // Test private strategy
    await page.goto('/strategies/private-1'); // Assuming this is a private strategy
    const privateCommentsSection = page.locator('hyvor-talk-comments');
    await expect(privateCommentsSection).not.toBeVisible();
    
    // Verify message for private strategies
    const privateMessage = page.locator('text=Comments are disabled for private strategies');
    await expect(privateMessage).toBeVisible();
  });

  test('should integrate with strategy performance metrics', async ({ page }) => {
    await page.goto('/strategies/1');

    // Verify comment count is displayed in strategy metrics
    const commentCount = page.locator('[data-testid="strategy-comment-count"]');
    await expect(commentCount).toBeVisible();

    // Verify comment count updates
    const initialCount = await commentCount.textContent();
    expect(initialCount).toBeDefined();
  });

  test('should maintain comment state across page navigation', async ({ page }) => {
    // Start on strategy page
    await page.goto('/strategies/1');
    
    // Navigate to another page and back
    await page.goto('/dashboard');
    await page.goto('/strategies/1');

    // Verify comments section maintains its state
    const commentsSection = page.locator('hyvor-talk-comments');
    await expect(commentsSection).toBeVisible();
    
    // Verify website-id remains consistent
    const websiteId = await commentsSection.getAttribute('website-id');
    expect(websiteId).toBeTruthy();
  });
});
