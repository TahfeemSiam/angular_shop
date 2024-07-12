import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartArray: Cart[] = [];
  totalCartAmount!: number;

  getCartLenghtObs = new Subject<number>();
  cartClearedObs = new Subject<boolean>();

  httpHeaders: HttpHeaders = new HttpHeaders({
    authorization: String(localStorage.getItem('jwt')),
  });

  constructor(private http: HttpClient) {}

  addToCart(cart: Cart) {
    if (!localStorage.getItem('Cart')) {
      localStorage.setItem('Cart', JSON.stringify([]));

      this.cartArray = JSON.parse(String(localStorage.getItem('Cart')));

      this.cartArray.push(cart);

      this.getCartLenghtObs.next(this.cartArray.length);

      localStorage.setItem('Cart', JSON.stringify(this.cartArray));
    } else {
      this.cartArray = JSON.parse(String(localStorage.getItem('Cart')));

      let product = this.cartArray.find(
        (e) => e.product_id === cart.product_id
      );
      if (product) {
        product.quantity = cart.quantity;
        let index = this.cartArray.indexOf(product);
        this.cartArray.splice(index, 1);
        this.cartArray.push(product);
        this.getCartLenghtObs.next(this.cartArray.length);
        localStorage.setItem('Cart', JSON.stringify(this.cartArray));
      } else {
        this.cartArray.push(cart);
        this.getCartLenghtObs.next(this.cartArray.length);
        localStorage.setItem('Cart', JSON.stringify(this.cartArray));
      }
    }
  }

  removeFromCart(id: number) {
    this.cartArray = JSON.parse(String(localStorage.getItem('Cart')));
    let product = this.cartArray.find((e) => e.product_id === id);
    if (product) {
      let index = this.cartArray.indexOf(product);
      this.cartArray.splice(index, 1);
      this.getCartLenghtObs.next(this.cartArray.length);
      localStorage.setItem('Cart', JSON.stringify(this.cartArray));
    }
  }

  getTotalCartAmount() {
    if (this.cartArray.length >= 1) {
      this.totalCartAmount = 0;
      for (let i = 0; i < this.cartArray.length; i++) {
        this.totalCartAmount +=
          this.cartArray[i].price * this.cartArray[i].quantity;
      }
      return this.totalCartAmount;
    } else {
      this.totalCartAmount = 0;
      return this.totalCartAmount;
    }
  }

  getCartData() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.cartArray = JSON.parse(String(localStorage.getItem('Cart')));
      return this.cartArray;
    } else {
      this.cartArray = [];
      return this.cartArray;
    }
  }

  confirmOrder(cart: Cart) {
    this.http
      .post('http://localhost:4000/api/order/placeOrder', cart, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((err) => {
          throw err;
        })
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error),
      });
  }

  getCartLenght() {
    if (localStorage.getItem('Cart')) {
      // Safe to use localStorage
      this.cartArray = JSON.parse(String(localStorage.getItem('Cart')));
      return this.cartArray.length;
    } else {
      this.cartArray = [];

      return this.cartArray.length;
    }
  }

  clearCart() {
    localStorage.setItem('Cart', JSON.stringify([]));
    this.cartClearedObs.next(true);
  }
}
