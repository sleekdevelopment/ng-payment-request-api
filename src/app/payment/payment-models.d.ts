/**
 * Created by hailevi on 4/3/18.
 */
/**
 * Apple payment support structure.
 */
export interface ApplyPayment {
    version: number;
    supportedMethods: string[];
    countryCode: string;
    merchantIdentifier: string;
    merchantCapabilities: string[];
}
/**
 * General minimal payment support structure.
 */
export interface GeneralPayment {
    supportedMethods: string;
}
/**
 * Support payment method structure.
 */
export interface SupportedPaymentMethod {
    supportedMethods: string;
    data?: ApplyPayment | GeneralPayment | any;
}
/**
 * Payer options structure.
 */
export interface PayerOptions {
    requestPayerNam?: boolean;
    requestPayerPhone?: boolean;
    requestPayerEmail?: boolean;
    requestShipping?: boolean;
}
export interface shippingOption {
    id: string;
    label: string;
    amount: {
        currency: string;
        value: string | number;
    };
}
export interface PaymentOptions {
    supportedPaymentMethods?: PaymentMethodData[];
    payerOptions?: PayerOptions;
    paymentDetails?: PaymentDetails;
}
export interface PaymentResponse {
}
