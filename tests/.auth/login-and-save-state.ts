import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/signin');
  await page.fill('input[name="email"], input[name="username"]', 'abc789');
  await page.fill('input[name="password"]', '333333');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/performance', { timeout: 15000 }); // adjust as needed for your app
  await page.context().storageState({ path: 'tests/.auth/auth.json' });
  await browser.close();
})();
