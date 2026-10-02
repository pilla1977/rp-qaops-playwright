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


test("API Test - Unauth check", async ({ page }) => {

  page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, loginToken);

  const productName = "ZARA COAT 3";

  // page.route("**/*.css", route => route.abort()); //step to block CSS loading
  // page.route("**/*.{.jpg,.png}", route => route.abort()); //step to block image loading
  // page.on('request', request=> console.log(request.url())); // print all the requests on console
  // page.on('response', Response=> console.log(Response.url(), Response.status())); // print all the response and status on console
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*=myorders]").click();
  await page.locator("tbody tr").last().waitFor();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

  
});