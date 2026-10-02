const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { OrdersPage } = require('../pageobjects/OrdersPage.js');

class POManager{
    constructor(page){
        this.page = page;
        this.login = new LoginPage(this.page);
        this.dashboard = new DashboardPage(this.page);
        this.checkout = new CheckoutPage(this.page);
        this.orderSummary = new OrdersPage(this.page);
    }

    getLoginPage(){
        return this.login
    }

    getDashboardPage(){
        return this.dashboard;
    }

    getCheckoutPage(){
        return this.checkout;
    }

    getOrdersPage(){
        return this.orderSummary;
    }
}

module.exports = {POManager}