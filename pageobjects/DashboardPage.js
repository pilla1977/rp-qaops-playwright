const { expect } = require('@playwright/test');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cart = page.locator(':text-is("Cart")');
        this.cartSection = this.page.locator(".cartSection");
    }

    async searchProduct(productName) {

        const count = await this.products.count();
        console.log(await this.products.allTextContents());

        for (let i = 0; i < count; i++) {
            const currProdName = await this.products.nth(i).locator("b").textContent();
            // await console.log(currProdName + " " + productName);
            if (currProdName === productName) {
                // await console.log(currProdName + " " + productName);
                await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    }

    async naviagteToCart(productName) {
        await this.cart.click();
        await this.cartSection.last().waitFor();
        console.log(await this.cartSection.allTextContents());
        await expect(this.page.getByText(productName)).toContainText(productName);
    }
}
module.exports = { DashboardPage }