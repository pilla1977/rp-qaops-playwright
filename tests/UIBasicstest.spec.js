const { test, expect } = require('@playwright/test');

test('Browser Context Declaration', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("#username")
    const pwd = page.locator("[type='password']")
    const signbtn = page.locator("#signInBtn")
    const prodTitles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle(/LoginPage Practise/);
    // type of selectors css and xpath
    await username.fill("playwright");
    await pwd.fill("password");
    await signbtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await username.fill("");
    await pwd.fill("");
    await username.fill("rahulshettyacademy");
    await pwd.fill("Learning@830$3mK2");
    await signbtn.click();
    // await expect
    // console.log(await prodTitles.first().textContent());
    // console.log(await prodTitles.nth(1).textContent());
    // console.log(await prodTitles.last().textContent());
    // await expect(prodTitles.first()).toContainText("iphone");
    console.log(await prodTitles.allTextContents());


});

test('Child Windows Handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docuLink = page.locator("[href*='documents-request']");    
    
    // block to be executed together to handle new child open
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //Listen for any new page: step status: pending, rejected, fullfilled
        docuLink.click(), //new page is opened
    ])
    const text = await newPage.locator(".red").textContent();
    const aText = text.split("@")[1];
    const domain = aText.split(" ")[0];
    // console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent()); // this line is tryng to get the value in username field, which was blank on DOM load, hence we will get blank value.
    console.log(await page.locator("#username").inputValue()); // this line get the edited value after the DOM load.
});