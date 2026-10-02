const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils')

let loginToken;
let orderNum;
const loginPayload = {
    userEmail: "cetc.midnight2@gmail.com",
    userPassword: "VZcom2014$"
}
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext);
    loginToken = await apiUtils.getToken(loginPayload);
    // console.log(loginToken);
    orderNum = await apiUtils.createOrder(orderPayload, loginToken);
    // console.log(orderNum);
});


test("Web API Testing Part 1", async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, loginToken);

    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");

    //code to validate Order page for recently created order
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody tr").last().waitFor();
    const rows = await page.locator("tbody tr");

    console.log(await rows.count());

    for (let i = 0; i < await rows.count(); i++) {
        const currOrderNum = await rows.nth(i).locator("th").textContent();
        // console.log(currOrderNum + " - " + orderNum)
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