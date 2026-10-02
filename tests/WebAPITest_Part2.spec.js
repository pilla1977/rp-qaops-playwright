const { test, expect, request } = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser}) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("cetc.midnight2@gmail.com");
    await page.locator("#userPassword").fill("VZcom2014$");
    await page.locator("#login").click();
    await page.locator(".card-body").last().waitFor();
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'})
});

test('E2E Ordering Flow', async () => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await page.pause();
    const count = await products.count();
    console.log(await products.allTextContents());


    for (let i = 0; i < count; i++) {
        const currProdName = await products.nth(i).locator("b").textContent();
        // await console.log(currProdName + " " + productName);
        if (currProdName === productName) {
            // await console.log(currProdName + " " + productName);
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    await page.locator(':text-is("Cart")').click();
    await page.locator(".cartSection").last().waitFor();
    console.log(await page.locator(".cartSection").allTextContents());
    await expect(page.getByText(productName)).toContainText(productName);

    await page.locator(':text-is("Checkout")').click();

    // checkout process

    await page.locator("input[value='4542 9931 9292 2293']").fill("4542 9931 9292 0090");
    await page.locator('div.field.small').locator('select').nth(0).selectOption("11");
    await page.locator('div.field.small').locator('select').nth(1).selectOption("30");
    await page.locator("//div[@class='payment__cc']//div[2]//input[1]").fill("444");
    await page.locator("//div[@class='payment__cc']//div[3]//input[1]").fill("cetctest passlow");

    // await page.pause();

    await page.locator('[name="coupon"]').fill("rahulshettyacademy");
    await page.locator('button:has-text("Apply Coupon")').click();
    await page.locator(':text-is("* Coupon Applied")').waitFor();
    await expect(page.locator(':text-is("* Coupon Applied")')).toBeVisible();
    await page.locator("[placeholder*=Country]").pressSequentially("ind", { delay: 150 }); // type the data sequentially
    const ddOption = page.locator(".ta-results");
    await ddOption.waitFor();
    const ddOptionCount = await ddOption.locator("button").count();

    for (let i = 0; i < ddOptionCount; i++) {
        const ddOptText = await ddOption.locator("button").nth(i).textContent();
        if (ddOptText === " India") {
            await ddOption.locator("button").nth(i).click();
            break;
        }
    }
    const email = "cetc.midnight2@gmail.com"
    await expect(page.locator(':text-is("cetc.midnight2@gmail.com")')).toHaveText(email);
    await page.locator(':text-is("Place Order ")').click();
    await page.locator(':text-is(" Thankyou for the order. ")').waitFor();
    await expect(page.locator(':text-is(" Thankyou for the order. ")')).toBeVisible();

    const orderNum = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).split("|")[1];
    // const orderNum = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).split("|").map(s => s.trim());


    console.log(orderNum);
    // await page.pause();

    //code to validate Order page for recently created order
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody tr").last().waitFor();
    const rows = await page.locator("tbody tr");

    console.log(await rows.count());

    for (let i = 0; i < await rows.count(); i++) {
        const currOrderNum = await rows.nth(i).locator("th").textContent();
        console.log(currOrderNum + " - " + orderNum)
        if (currOrderNum.trim() === orderNum.trim()) {
            await rows.nth(i).locator(':text-is("View")').click();
            break;
        }
    }
    await page.locator('.email-title').waitFor();
    await expect(page.locator('.email-title')).toHaveText(" order summary ");
    await expect(page.locator('div.col-text.-main')).toHaveText(orderNum);
    // await page.pause();
});