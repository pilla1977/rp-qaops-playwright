class APIUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken(loginPayload) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
        // expect(await loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const loginToken = loginResponseJson.token;
        // console.log(loginToken);
        return loginToken;
    }

    async createOrder(orderPayload,loginToken) {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': loginToken,
                    'content-type': 'application/json',

                }
            }
        );
        const orderResponseJson = await orderResponse.json();
        // console.log(orderResponseJson);
        const orderNum = orderResponseJson.orders[0];
        // console.log(orderNum);
        return orderNum;
    }
}
module.exports = {APIUtils};