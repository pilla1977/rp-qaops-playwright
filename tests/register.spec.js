const {test, expect} = require ('@playwright/test');

test('Register User', async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('p.login-wrapper-footer-text').click();
    await page.locator('#firstName').fill("cetctest");
    await page.locator('#lastName').fill("passlow");
    // await page.locator("#userEmail").fill("cetc.midnight1@gmail.com");
    await page.locator("#userEmail").fill("cetc.midnight2@gmail.com");
    await page.locator("#userMobile").fill("2344568899");
    await page.locator("[formcontrolname='occupation']").selectOption("Student");
    await page.locator('input[value="Male"]').check();
    await page.locator("#userPassword").fill("VZcom2014$");
    await page.locator("#confirmPassword").fill("VZcom2014$");
    await page.getByRole('checkbox').check();
    await page.locator("#login").click();
    await expect(page.getByText('Account Created Successfully', { exact: true })).toBeVisible();
    

});