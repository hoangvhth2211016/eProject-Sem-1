import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart/cart.model';
import { CartProduct } from 'src/app/models/CartProduct/cart-product.model';
import { Product } from 'src/app/models/Product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;
  cartSubject: BehaviorSubject<Cart>;

  constructor() {
    this.cart = this.getCart();
    this.cartSubject = new BehaviorSubject(this.cart);
  }

  // get cart
  getCart(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return (cartJson) ? JSON.parse(cartJson) : new Cart();
  }

  // set cart
  setCart() {
    if (this.cart.cartProducts.length === 0) {
      this.cart = new Cart();
    } else {
      this.cart.subTotal = this.cart.cartProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
      this.cart.shippingFee = (this.cart.subTotal > 100) ? 0 : 6;
      this.cart.total = this.cart.subTotal + this.cart.shippingFee;
    }
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  // observe cart
  observeCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // add an item to cart
  addToCart(product: Product, quantity: number) {
    const currentProduct = this.cart.cartProducts.find(item => item.product.id === product.id);
    if (currentProduct) {
      currentProduct.quantity += quantity;
    } else {
      this.cart.cartProducts.push(new CartProduct(product, quantity));
    }
    this.setCart();
  }

  // remove item from cart
  removeFromCart(index: number) {
    this.cart.cartProducts.splice(index, 1);
    this.setCart();
  }

  // change quantity
  updateQuantity(id: string, quantity: number) {
    this.cart.cartProducts.forEach(item => {
      if (item.product.id === id) {
        item.quantity = quantity;
      }
    })
    this.setCart();
  }

  // clear cart
  clearCart() {
    this.cart = new Cart();
    this.setCart();
  }
}
