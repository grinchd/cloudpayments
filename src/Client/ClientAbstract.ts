import fetch from 'node-fetch';
import {ClientOptions} from "./ClientOptions";
import {join} from "path";
import {Response, BaseResponse} from "../Api/response";

export class ClientAbstract {
    protected options: ClientOptions & {endpoint: string};

    constructor(_options: ClientOptions) {
        this.options = Object.assign({endpoint: 'https://api.cloudpayments.ru'}, _options);
    }

    public getPublicId() {
        return this.options.publicId;
    }

    public getEndpoint(): string {
        return this.options.endpoint;
    }
}

export class ClientRequestAbstract extends ClientAbstract {
    /**
     * HTTP Client
     *
     * @returns {(url: (string | Request), init?: RequestInit) => Promise<Response>}
     */
    protected get client() {
        return fetch;
    }

    /**
     *
     */
    public async ping(id: string): Promise<Response<BaseResponse>> {
        const response = await this.client(
            this.getEndpoint().concat(join('/test')),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Request-ID': id
                },
                method: 'POST',
                body: JSON.stringify({})
            }
        );

        return new Response(await response.json());
    }

    /**
     * Create request to an API endpoint.
     *
     * @param {string} url
     * @param {Object} data
     * @param {string} requestId
     * @returns {Promise<Response<R extends BaseResponse>>}
     */
    protected async call<
        R extends BaseResponse = BaseResponse
    >(url: string, data?: object, requestId?: string): Promise<Response<R>> {
        const headers: any = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '.concat(new Buffer("".concat(this.options.publicId, ":", this.options.privateKey))
                .toString("base64")
            )
        };

        if (requestId) {
            headers['X-Request-ID'] = requestId;
        }

        const response = await this.client(
            this.getEndpoint().concat(join('/', url)),
            {
                headers,
                method: 'POST',
                body: data ? JSON.stringify(data) : undefined
            }
        );

        const result = await response.json();
        console.log('result', result);
        return new Response(result);
    }
}

export * from '../Api/constants';
export * from '../Api/notification';