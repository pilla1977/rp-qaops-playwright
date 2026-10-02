const { expect } = require('@playwright/test');

class OrdersPage {
    constructor(page) {
        this.page = page;
        this.myOrdersBtn = page.locator("button[routerlink*=myorders]");
        this.orderTbl = page.locator("tbody tr");
        this.orderDetailsTitle = page.locator('.email-title');
        this.orderNum = page.locator('div.col-text.-main');
    }
    async navigateToOrderList() {
        await this.myOrdersBtn.click();
        await this.orderTbl.last().waitFor();
    }

    async selectOrder(orderNum) {
        const rows = await this.orderTbl;

        console.log(await rows.count());

        for (let i = 0; i < await rows.count(); i++) {
            const currOrderNum = await rows.nth(i).locator("th").textContent();
            console.log(currOrderNum + " - " + orderNum)
            if (currOrderNum.trim() === orderNum.trim()) {
                await rows.nth(i).locator(':text-is("View")').click();
                break;
            }
        }
    }

    async validateOrderSummary(orderNum) {
        await this.orderDetailsTitle.waitFor();
        await expect(this.orderDetailsTitle).toHaveText(" order summary ");
        await expect(this.orderNum).toHaveText(orderNum);
    }
}
module.exports = {OrdersPage}