const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.checkout = page.locator(':text-is("Checkout")');
        this.ccNum = page.locator("input[value='4542 9931 9292 2293']");
        this.ccMonthYear = page.locator('div.field.small');
        this.ccSecCode = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
        this.ccName = page.locator("//div[@class='payment__cc']//div[3]//input[1]");
        this.coupon = page.locator('[name="coupon"]');
        this.applyCouponBtn = page.locator('button:has-text("Apply Coupon")');
        this.couponCheck = page.locator(':text-is("* Coupon Applied")');
        this.country = page.locator("[placeholder*=Country]");
        this.placeOrderBtn = page.locator(':text-is("Place Order ")');
        this.orderConfirmation = page.locator(':text-is(" Thankyou for the order. ")');
        this.orderNum = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async fillCCDetails(ccNum, ccMonth, ccYear, ccSecCode, ccName) {
        await this.checkout.click();
        await this.ccNum.fill(ccNum);
        await this.ccMonthYear.locator('select').nth(0).selectOption(ccMonth);
        await this.ccMonthYear.locator('select').nth(1).selectOption(ccYear);
        await this.ccSecCode.fill(ccSecCode);
        await this.ccName.fill(ccName);
    }

    async applyCouponCode(couponCode) {
        await this.coupon.fill(couponCode);
        await this.applyCouponBtn.click();
        await this.couponCheck.waitFor();
        await expect(this.couponCheck).toBeVisible();
    }

    async selectCountry(ddCountry) {
        await this.country.pressSequentially("ind", { delay: 150 });
        const ddOption = this.page.locator(".ta-results");
        await ddOption.waitFor();
        const ddOptionCount = await ddOption.locator("button").count();

        for (let i = 0; i < ddOptionCount; i++) {
            const ddOptText = await ddOption.locator("button").nth(i).textContent();
            if (ddOptText === ddCountry) {
                await ddOption.locator("button").nth(i).click();
                break;
            }
        }
    }

    async placeOrderandCheck() {
        // await expect(page.locator(':text-is("cetc.midnight2@gmail.com")')).toHaveText(userName);
        await this.placeOrderBtn.click();
        await this.orderConfirmation.waitFor();
        await expect(this.orderConfirmation).toBeVisible();

        const orderNum = (await this.orderNum.textContent()).split("|")[1];
        // const orderNum = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).split("|").map(s => s.trim());
        console.log(orderNum);
        return orderNum;
    }

}
module.exports = { CheckoutPage }