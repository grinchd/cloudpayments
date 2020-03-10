"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const ClientResponse_1 = require("./ClientResponse");
const path_1 = require("path");
const ClientAbstract_1 = require("./ClientAbstract");
class ClientRequestAbstract extends ClientAbstract_1.ClientAbstract {
    /**
     * HTTP Client
     *
     * @returns {(url: (string | Request), init?: RequestInit) => Promise<Response>}
     */
    get client() {
        return node_fetch_1.default;
    }
    /**
     *
     */
    async ping() {
        const response = await this.client(this.getEndpoint().concat(path_1.join("/test")), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        return new ClientResponse_1.ClientResponse(await response.json());
    }
    /**
     * Create request to an API endpoint.
     *
     * @param {string} url
     * @param {Object} data
     * @param {string} requestId
     * @returns {Promise<ClientResponse<BaseResponse>>}
     */
    async call(url, data, requestId) {
        const authorization = Buffer.from(`${this.options.publicId}:${this.options.privateKey}`, "utf-8").toString("base64");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Basic ${authorization}`
        };
        if (requestId) {
            headers["X-Request-ID"] = requestId;
        }
        console.debug(`cp.call: url ${this.getEndpoint().concat(path_1.join("/", url))} request ${JSON.stringify({
            headers,
            method: "POST",
            body: data ? JSON.stringify(data) : undefined
        })}`);
        const response = await this.client(this.getEndpoint().concat(path_1.join("/", url)), {
            headers,
            method: "POST",
            body: data ? JSON.stringify(data) : undefined
        });
        const responseBody = await response.text();
        console.debug(`${this.getEndpoint().concat(path_1.join("/", url))} response ${responseBody}`);
        return JSON.parse(responseBody);
    }
}
exports.ClientRequestAbstract = ClientRequestAbstract;
//# sourceMappingURL=ClientRequestAbstract.js.map