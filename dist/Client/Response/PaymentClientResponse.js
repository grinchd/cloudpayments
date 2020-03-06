"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientResponse_1 = require("../ClientResponse");
class PaymentClientResponse extends ClientResponse_1.ClientResponse {
    isPaymentSuccessResponse() {
        const { Model } = this.getResponse();
        return super.isSuccess() && ClientResponse_1.ClientResponse.has(["TransactionId", "AuthCode"], Model);
    }
    static isPaymentSuccessResponse(data) {
        return this.has(["TransactionId", "AuthCode"], data);
    }
}
exports.PaymentClientResponse = PaymentClientResponse;
//# sourceMappingURL=PaymentClientResponse.js.map