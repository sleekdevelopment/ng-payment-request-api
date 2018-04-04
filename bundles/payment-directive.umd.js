(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('payment-directive', ['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['payment-directive'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

var PaymentRequestDirective = /** @class */ (function () {
    function PaymentRequestDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.options = {};
        this.onCheckout = new core.EventEmitter();
        this.onShippingOptionChange = new core.EventEmitter();
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
    { type: core.Directive, args: [{
                selector: '[appPaymentRequest]'
            },] },
];
PaymentRequestDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
PaymentRequestDirective.propDecorators = {
    "options": [{ type: core.Input, args: ['options',] },],
    "items": [{ type: core.Input, args: ['items',] },],
    "shippingOptions": [{ type: core.Input, args: ['shippingOptions',] },],
    "onCheckout": [{ type: core.Output },],
    "onShippingOptionChange": [{ type: core.Output },],
    "onClick": [{ type: core.HostListener, args: ['click', ['$event'],] },],
};
var PaymentRequestModule = /** @class */ (function () {
    function PaymentRequestModule() {
    }
    return PaymentRequestModule;
}());
PaymentRequestModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [PaymentRequestDirective],
                exports: [PaymentRequestDirective]
            },] },
];
PaymentRequestModule.ctorParameters = function () { return []; };

exports.PaymentRequestModule = PaymentRequestModule;
exports.ɵa = PaymentRequestDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=payment-directive.umd.js.map
