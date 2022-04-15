import { Component, OnInit } from '@angular/core';
import { ShopService, CartItem } from '../shop.service';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import {Location } from "@angular/common";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [egretAnimations]
})
export class CartComponent implements OnInit {
  public cart: CartItem[];
  public total: number;
  public subTotal: number;
  public vat: number = 15;
  constructor(
    private shopService: ShopService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCart();
    this.onQuantityChange();
  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      cart.forEach((item) => {

        
        item.product.gallery = ['assets/images/mm-pc.jpg', 'assets/images/mm-pc2.jpg'];
          item.product.photo = 'assets/images/mm-pc' + this.randomIntFromInterval(2,5) + '.jpg';

      });
      
      this.cart = cart;
      
    })
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  removeProduct(cartItem) {
    this.shopService
    .removeFromCart(cartItem)
    .subscribe(res => {
      this.cart = res;
    })
  }
  onQuantityChange() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.preis * item.data.quantity)
    })
    this.total = this.subTotal + (this.subTotal * (15/100))
  }

  goBack() {
    this.location.back();
  } 

}
