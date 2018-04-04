# Angular Payment Request Api

Payment Request wrapper  with TypeScript for angular +4.

## Installation

To install this library, run:
```bash
$ npm install ng-payment-request-api --save
```

## How to use

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//Import payment request api module
import {PaymentRequestModule} from "ng-payment-request-api";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaymentRequestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
Parent Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  paymentOptions = {
    supportedPaymentMethods: [
      // regular payment
      {
        supportedMethods: 'basic-card',
      },
      //apply pay support. currently on safari ios only apply pay supported.
      {
        supportedMethods: 'https://apple.com/apple-pay',
        data: {
          version: 2,
          supportedNetworks:  ['amex', 'jcb', 'visa'],
          countryCode: 'US',
          merchantIdentifier: 'merchant.sleek.com',
          merchantCapabilities: ['supportsDebit', 'supportsCredit', 'supports3DS']
        }
      }
    ]
  };
  items: PaymentItem[] = [
    {
      label: 'product 1',
      amount: {
        value: 5,
        currency: "USD"
      }
    },
    {
      label: 'product 2',
      amount: {
        value: 8,
        currency: "USD"
      }
    }
    ];
  shippingOptions = [{
    id: 'economy',
    label: 'Economy Shipping (5-7 Days)',
    amount: {
      currency: 'USD',
      value: '0',
    },
  }, {
    id: 'express',
    label: 'Express Shipping (2-3 Days)',
    amount: {
      currency: 'USD',
      value: '5',
    },
  }, {
    id: 'next-day',
    label: 'Next Day Delivery',
    amount: {
      currency: 'USD',
      value: '12',
    },
  }];
  constructor() {}

  chargeClient(paymentResponse) {
    //TODO actual charge.
  }

  updateShippingOption(response) {
    // example:
    // response =  {
    //     total: 55,
    //     shippingOption :  {
    //       id: 'next-day',
    //       label: 'Next Day Delivery',
    //       amount: {
    //       currency: 'USD',
    //           value: '12',
    //       }
    //     }
    //  }
    }
}

```
And just use the Directive in your HTML

```html
 <button appPaymentRequest
          [shippingOptions]="shippingOptions"
          [options]="paymentOptions"
          [items]="items"
          (onCheckout)="chargeClient($event)"
          (onShippingOptionChange)="updateShippingOption($event)">
      Checkout
  </button>
```

paymentOptions configuration can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API). If you don't provide any parameters, default one are used.


## License

MIT © [Hai levi from Sleek Development](mailto:hai@sleekdevelopment.com)
