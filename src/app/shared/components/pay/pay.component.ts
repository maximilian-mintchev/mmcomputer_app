import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  product = {
    price: 0.1,
    description: 'used couch, decent condition'
  };

  paidFor = false;

  constructor() { }

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: this.product.description,
              amount: {
                currency_node: 'USD',
                value: this.product.price
              }
            }

            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
          alert('');
        },
        onError: err => {
          console.log();
          alert('Ein Fehler ist beim Bezahlvorgang aufgetreten');
        }
      })
      .render(this.paypalElement.nativeElement);
  }

}
