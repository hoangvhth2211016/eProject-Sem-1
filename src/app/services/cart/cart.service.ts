import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/Cart/cart.model';
import { CartItem } from 'src/app/models/CartItem/cart-item.model';
import { Product } from 'src/app/models/Product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart!: Cart;

  constructor() { }

  // get cart
  getCart(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return (cartJson) ? JSON.parse(cartJson) : new Cart();
  }

  // set cart
  setCart() {
    this.cart.total = this.cart.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJson);
  }

  // add an item to cart
  addToCart(product: Product, quantity: number) {
    let currentItem = this.cart.cartItems.find(item => item.product.id === product.id);
    if (currentItem) {
      currentItem.quantity += quantity;
    } else {
      this.cart.cartItems.push(new CartItem(product, quantity));
    }
    this.setCart();
  }

  // remove item from cart
  removeFromCart(id: string) {
    this.cart.cartItems = this.cart.cartItems.filter(item => {
      item.product.id != id;
    });
    this.setCart();
  }

  // change quantity
  changeQuantity(id: string, quantity: number) {
    let cartItem = this.cart.cartItems.find(item => {
      item.product.id === id;
    })
    if (!cartItem) return;
    cartItem.quantity = quantity;
    this.setCart();
  }

}
