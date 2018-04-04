import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaymentRequestDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.options = {};
        this.onCheckout = new EventEmitter();
        this.onShippingOptionChange = new EventEmitter();
        if (this.isPaymentSupported()) {
            this.items = [];
            this.options = Object.assign({}, this.options, {
                supportedPaymentMethods: [{ supportedMethods: 'basic-card' }],
                paymentDetails: {
                    total: {
                        label: 'Total',
                        amount: {
                            currency: 'USD',
                            value: 0
                        }
                    },
                    shippingOptions: this.shippingOptions,
                    displayItems: this.items
                },
                payerOptions: {}
            });
            this.updatePayment();
        }
        else {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
        }
    }
    /**
     * Update native payment request object.
     * @return {?}
     */
    updatePayment() {
        this.options.paymentDetails.displayItems = this.items;
        let /** @type {?} */ total = 0;
        this.items.forEach((item) => {
            total = +parseFloat(/** @type {?} */ (item.amount.value));
        });
        this.options.paymentDetails.total.amount.value = /** @type {?} */ (total);
        this.payment = new PaymentRequest(this.options.supportedPaymentMethods, this.options.paymentDetails, this.options.payerOptions);
        this.handleShippingChangeEvent();
    }
    /**
     * Trigger Payment request native popup
     * @return {?}
     */
    checkout() {
        this.updatePayment();
        this.payment.show().then((paymentResponse) => {
            paymentResponse.complete();
            this.onCheckout.emit(paymentResponse);
        }).catch((err) => {
            this.onCheckout.emit({
                error: err,
                success: false
            });
        });
    }
    /**
     * Handle shipping option change event.
     * @return {?}
     */
    handleShippingChangeEvent() {
        this.payment.addEventListener('shippingoptionchange', (event) => {
            const /** @type {?} */ paymentRequest = event.target;
            const /** @type {?} */ selectedId = (/** @type {?} */ (paymentRequest)).shippingOption;
            let /** @type {?} */ res = {};
            this.options.paymentDetails.shippingOptions.forEach((shippingOption) => {
                if (shippingOption.id === selectedId) {
                    shippingOption.selected = true;
                    this.options.paymentDetails.total.amount.value = /** @type {?} */ ((parseFloat(this.options.paymentDetails.total.amount.value) + parseFloat(shippingOption.amount.value)));
                    res.shippingOption = shippingOption;
                    res.total = this.options.paymentDetails.total.amount.value;
                }
            });
            (/** @type {?} */ (event)).updateWith(new Promise((resolve) => {
                //return updated total value and selected shipping option.
                this.onShippingOptionChange.emit(res);
                resolve(this.options.paymentDetails);
            }));
        });
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClick($event) {
        if (this.isPaymentSupported) {
            this.checkout();
        }
    }
    /**
     * @return {?}
     */
    isPaymentSupported() {
        return !!(/** @type {?} */ (window)).PaymentRequest;
    }
}
PaymentRequestDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appPaymentRequest]'
            },] },
];
/** @nocollapse */
PaymentRequestDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
PaymentRequestDirective.propDecorators = {
    "options": [{ type: Input, args: ['options',] },],
    "items": [{ type: Input, args: ['items',] },],
    "shippingOptions": [{ type: Input, args: ['shippingOptions',] },],
    "onCheckout": [{ type: Output },],
    "onShippingOptionChange": [{ type: Output },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaymentRequestModule {
}
PaymentRequestModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [PaymentRequestDirective],
                exports: [PaymentRequestDirective]
            },] },
];
/** @nocollapse */
PaymentRequestModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { PaymentRequestModule, PaymentRequestDirective as ɵa };
//# sourceMappingURL=payment-directive.js.map
