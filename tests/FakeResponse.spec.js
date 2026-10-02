const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils')

let loginToken;
let orderNum;
const loginPayload = {
    userEmail: "cetc.midnight2@gmail.com",
    userPassword: "VZcom2014$"
};
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext);
    loginToken = await apiUtils.getToken(loginPayload);
    // console.log(loginToken);
    orderNum = await apiUtils.createOrder(orderPayload, loginToken);
    // console.log(orderNum);
});


test("API Test - Faking Response", async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, loginToken);

    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });


    //code to validate Order page for recently created order
    await page.locator("button[routerlink*=myorders]").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
    
    // await page.pause();
});