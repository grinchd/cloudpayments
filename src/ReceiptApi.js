"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const objectHash = require("object-hash");
const ClientAbstract_1 = require("./Client/ClientAbstract");
const constants_1 = require("./Api/constants");
class ReceiptApi extends ClientAbstract_1.ClientRequestAbstract {
    getEndpoint() {
        return this.options.endpoint.replace(/\/$/, '').concat('/kkt');
    }
    /**
     * Create receipt
     *
     * @param {ReceiptTypes} type   Receipt type
     * @param {Receipt} receipt   Income receipt data
     * @param {string} id               Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    createReceipt(type, receipt, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { inn, notify, records, taxationSystem, accountId, invoiceId } = Object.assign({}, receipt, this.options.org || {});
            assert_1.ok(inn, 'You should fill "inn" field');
            assert_1.ok(constants_1.validateTaxationSystem(taxationSystem), 'You should fill "taxationSystem" field');
            assert_1.ok(records && records.length > 0, 'You should fill "records" field');
            assert_1.ok(records.filter(x => false === constants_1.validateVAT(x.vat)).length === 0, 'You should fill VAT with valid values');
            const data = {
                Inn: inn,
                InvoiceId: invoiceId,
                AccountId: accountId,
                Type: type,
                CustomerReceipt: {
                    taxationSystem: taxationSystem,
                    email: notify ? notify.email || '' : '',
                    phone: notify ? notify.phone || '' : '',
                    Items: records.map(item => ({
                        label: item.label,
                        price: item.price,
                        quantity: item.quantity,
                        amount: item.amount,
                        vat: item.vat,
                        ean13: item.ean13 || null
                    }))
                }
            };
            const requestId = id || objectHash(receipt);
            return yield this.call('receipt', data, requestId);
        });
    }
}
exports.ReceiptApi = ReceiptApi;
//# sourceMappingURL=ReceiptApi.js.map