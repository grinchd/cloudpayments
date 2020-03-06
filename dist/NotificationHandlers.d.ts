/// <reference types="node" />
import { ClientAbstract } from "./Client";
import { IncomingMessage } from "http";
import * as ApiTypes from "./Api/notification";
import { ResponseCodes } from "./Api";
export declare type NotificationHandlerValidator<TRequest> = (request: TRequest) => Promise<ResponseCodes>;
export interface NotificationCustomPayload {
    payload: object | string;
    headers?: {
        [key: string]: string;
    };
    signature?: string;
}
export declare type NotificationPayload = NotificationCustomPayload | IncomingMessage;
export declare class NotificationHandlers extends ClientAbstract {
    handleCheckRequest(req: NotificationPayload, validator?: NotificationHandlerValidator<ApiTypes.CheckNotification>): Promise<{
        request: ApiTypes.CheckNotification;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.CheckNotification;
        response: {
            code?: undefined;
        };
    }>;
    handlePayRequest(req: NotificationPayload, validator?: NotificationHandlerValidator<ApiTypes.PayNotification>): Promise<{
        request: ApiTypes.PayNotification;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.PayNotification;
        response: {
            code?: undefined;
        };
    }>;
    handleConfirmRequest(req: NotificationPayload, validator?: NotificationHandlerValidator<ApiTypes.ConfirmNotification>): Promise<{
        request: ApiTypes.ConfirmNotification;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.ConfirmNotification;
        response: {
            code?: undefined;
        };
    }>;
    handleFailRequest(req: NotificationPayload, validator?: NotificationHandlerValidator<ApiTypes.FailNotification>): Promise<{
        request: ApiTypes.FailNotification;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.FailNotification;
        response: {
            code?: undefined;
        };
    }>;
    handleRefundRequest(req: NotificationPayload, validator?: NotificationHandlerValidator<ApiTypes.RefundNotification>): Promise<{
        request: ApiTypes.RefundNotification;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.RefundNotification;
        response: {
            code?: undefined;
        };
    }>;
    handleRecurrentRequest(req: NotificationPayload, validator?: NotificationHandlerValidator<ApiTypes.SubscriptionModel>): Promise<{
        request: ApiTypes.SubscriptionModel;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.SubscriptionModel;
        response: {
            code?: undefined;
        };
    }>;
    handleReceiptRequest(req: NotificationPayload, validator?: NotificationHandlerValidator<ApiTypes.ReceiptNotification<any>>): Promise<{
        request: ApiTypes.ReceiptNotification<any>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.ReceiptNotification<any>;
        response: {
            code?: undefined;
        };
    }>;
    protected handle<TRequest, TResponse>(req: NotificationPayload, validator?: NotificationHandlerValidator<TRequest>): Promise<{
        request: TRequest;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: TRequest;
        response: {
            code?: undefined;
        };
    }>;
    private checkPayload;
    private parseRequest;
}
