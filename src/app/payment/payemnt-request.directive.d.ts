import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { PaymentOptions } from './payment-models';
export declare class PaymentRequestDirective {
    private el;
    private renderer;
    options: PaymentOptions;
    items: PaymentItem[];
    shippingOptions: any[];
    onCheckout: EventEmitter<{}>;
    onShippingOptionChange: EventEmitter<{}>;
    payment: PaymentRequest;
    constructor(el: ElementRef, renderer: Renderer2);
    /**
     * Update native payment request object.
     */
    updatePayment(): void;
    /**
     * Trigger Payment request native popup
     */
    checkout(): void;
    /**
     * Handle shipping option change event.
     */
    handleShippingChangeEvent(): void;
    onClick($event: any): void;
    isPaymentSupported(): boolean;
}
