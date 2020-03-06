"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientResponse_1 = require("../ClientResponse");
class PayoutClientResponse extends ClientResponse_1.ClientResponse {
    isPayoutSuccessResponse() {
        const { Model } = this.getResponse();
        return this.isSuccess() && ClientResponse_1.ClientResponse.has(["TransactionId", "AuthCode"], Model);
    }
}
exports.PayoutClientResponse = PayoutClientResponse;
//# sourceMappingURL=PayoutClientResponse.js.map