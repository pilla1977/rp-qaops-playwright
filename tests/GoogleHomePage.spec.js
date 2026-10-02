const { test, expect } = require('@playwright/test');

test("Google home page - locators check", async ({ page }) => {

    await page.goto("https://www.google.com");

    // Accept cookie consent dialog if it appears
    const acceptBtn = page.getByRole('button', { name: /accept all|i agree/i });
    if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await acceptBtn.click();
    }

    const searchBox = page.locator('textarea[name="q"]');
    const searchBtn = page.locator('input[name="btnK"]').first();
    const luckyBtn = page.locator('input[name="btnI"]').first();
    const gmailLink = page.locator('a', { hasText: 'Gmail' });
    const imagesLink = page.locator('a', { hasText: 'Images' });
    const aboutLink = page.locator('a', { hasText: 'About' });
    const storeLink = page.locator('a', { hasText: 'Store' });

    await expect(searchBox).toBeVisible();
    await expect(searchBtn).toBeAttached();
    await expect(luckyBtn).toBeAttached();
    await expect(gmailLink).toBeVisible();
    await expect(imagesLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(storeLink).toBeVisible();

    await searchBox.fill("Playwright automation");
    await expect(searchBox).toHaveValue("Playwright automation");
});
