const { test } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');
const dataSet = JSON.parse(JSON.stringify(require('../utils/e2eOrder_Data.json')));

// test.describe.configure({mode:'serial'});

for (const data of dataSet) {
    test(`E2E Ordering Flow ${data.productName}`, async ({ page }) => {

        const url = data.url;

        // Login step data
        const userName = data.userName;
        const password = data.password;

        // Checkout step data
        const ccNum = data.ccNum;
        const ccMonth = data.ccMonth;
        const ccYear = data.ccYear;
        const ccSecCode = data.ccSecCode;
        const ccName = data.ccName;
        const couponCode = data.couponCode;
        const country = data.country;
        const productName = data.productName;

        console.log("Product Name: " + productName);

        const poMgr = new POManager(page);

        // Login to website
        const login = poMgr.getLoginPage();
        await login.goTo(url);
        await login.validLogin(userName, password);

        // Search Product, Add to cart and then navigate to cart for review
        const dashboard = poMgr.getDashboardPage();
        await dashboard.searchProduct(productName);
        await dashboard.naviagteToCart(productName);

        // checkout process
        const checkout = poMgr.getCheckoutPage();

        await checkout.fillCCDetails(ccNum, ccMonth, ccYear, ccSecCode, ccName);
        await checkout.applyCouponCode(couponCode);
        await checkout.selectCountry(country);
        const orderNum = await checkout.placeOrderandCheck();

        //Validate Order page for recently created order
        const orderSummary = poMgr.getOrdersPage();
        await orderSummary.navigateToOrderList();
        await orderSummary.selectOrder(orderNum);
        await orderSummary.validateOrderSummary(orderNum);

        // await page.pause();

    });
};