import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var PaymentRequestDirective = /** @class */ (function () {
    function PaymentRequestDirective(el, renderer) {
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
    PaymentRequestDirective.prototype.updatePayment = function () {
        this.options.paymentDetails.displayItems = this.items;
        var total = 0;
        this.items.forEach(function (item) {
            total = +parseFloat((item.amount.value));
        });
        this.options.paymentDetails.total.amount.value = (total);
        this.payment = new PaymentRequest(this.options.supportedPaymentMethods, this.options.paymentDetails, this.options.payerOptions);
        this.handleShippingChangeEvent();
    };
    PaymentRequestDirective.prototype.checkout = function () {
        var _this = this;
        this.updatePayment();
        this.payment.show().then(function (paymentResponse) {
            paymentResponse.complete();
            _this.onCheckout.emit(paymentResponse);
        }).catch(function (err) {
            _this.onCheckout.emit({
                error: err,
                success: false
            });
        });
    };
    PaymentRequestDirective.prototype.handleShippingChangeEvent = function () {
        var _this = this;
        this.payment.addEventListener('shippingoptionchange', function (event) {
            var paymentRequest = event.target;
            var selectedId = ((paymentRequest)).shippingOption;
            var res = {};
            _this.options.paymentDetails.shippingOptions.forEach(function (shippingOption) {
                if (shippingOption.id === selectedId) {
                    shippingOption.selected = true;
                    _this.options.paymentDetails.total.amount.value = ((parseFloat(_this.options.paymentDetails.total.amount.value) + parseFloat(shippingOption.amount.value)));
                    res.shippingOption = shippingOption;
                    res.total = _this.options.paymentDetails.total.amount.value;
                }
            });
            ((event)).updateWith(new Promise(function (resolve) {
                _this.onShippingOptionChange.emit(res);
                resolve(_this.options.paymentDetails);
            }));
        });
    };
    PaymentRequestDirective.prototype.onClick = function ($event) {
        if (this.isPaymentSupported) {
            this.checkout();
        }
    };
    PaymentRequestDirective.prototype.isPaymentSupported = function () {
        return !!((window)).PaymentRequest;
    };
    return PaymentRequestDirective;
}());
PaymentRequestDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appPaymentRequest]'
            },] },
];
PaymentRequestDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
PaymentRequestDirective.propDecorators = {
    "options": [{ type: Input, args: ['options',] },],
    "items": [{ type: Input, args: ['items',] },],
    "shippingOptions": [{ type: Input, args: ['shippingOptions',] },],
    "onCheckout": [{ type: Output },],
    "onShippingOptionChange": [{ type: Output },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
};
var PaymentRequestModule = /** @class */ (function () {
    function PaymentRequestModule() {
    }
    return PaymentRequestModule;
}());
PaymentRequestModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [PaymentRequestDirective],
                exports: [PaymentRequestDirective]
            },] },
];
PaymentRequestModule.ctorParameters = function () { return []; };

export { PaymentRequestModule, PaymentRequestDirective as ɵa };
//# sourceMappingURL=payment-directive.js.map
