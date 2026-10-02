const { Given, When, Then } = require('@cucumber/cucumber');
// const { POManager } = require('../../pageobjects/POManager.js');
// const playwright = require('@playwright/test');
const data = JSON.parse(JSON.stringify(require('../../utils/e2eOrder_Data.json')))[1];
const { expect } = require('@playwright/test');

Given('a user is logged in using {string} and {string}', { timeout: 10000 }, async function (userName, password) {
    // Login to website
    const login = this.poMgr.getLoginPage();
    await login.goTo("https://rahulshettyacademy.com/client");
    await login.validLogin(userName, password);

});

When('user adds and verify {string} in cart', async function (productName) {
    // Search Product, Add to cart and then navigate to cart for review
    const dashboard = this.poMgr.getDashboardPage();
    await dashboard.searchProduct(productName);
    await dashboard.naviagteToCart(productName);
});

When('enter valid details and place the Order', async function () {
    // checkout process        
    const ccNum = data.ccNum;
    const ccMonth = data.ccMonth;
    const ccYear = data.ccYear;
    const ccSecCode = data.ccSecCode;
    const ccName = data.ccName;
    const couponCode = data.couponCode;
    const country = data.country;
    const productName = data.productName;

    console.log("Product Name: " + productName);

    const checkout = this.poMgr.getCheckoutPage();

    await checkout.fillCCDetails(ccNum, ccMonth, ccYear, ccSecCode, ccName);
    await checkout.applyCouponCode(couponCode);
    await checkout.selectCountry(country);
    this.orderNum = await checkout.placeOrderandCheck();
});

Then('Verify order is present in the Order History', async function () {
    //Validate Order page for recently created order
    const orderSummary = this.poMgr.getOrdersPage();
    await orderSummary.navigateToOrderList();
    await orderSummary.selectOrder(this.orderNum);
    await orderSummary.validateOrderSummary(this.orderNum);
});

Given('a user is logged in to e-commerce application using {string} and {string}', { timeout: 10000 }, async function (userName, password) {
    const username = this.page.locator("#username")
    const pwd = this.page.locator("[type='password']")
    const signbtn = this.page.locator("#signInBtn")
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(this.page).toHaveTitle(/LoginPage Practise/);
    await username.fill(userName);
    await pwd.fill(password);
    await signbtn.click();
});

Then('Incorrect login message should be displayed', async function () {
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});