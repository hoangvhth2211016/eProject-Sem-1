import { CartItem } from "../CartItem/cart-item.model";

export class Cart {
  cartItems!: CartItem[];
  total!: number;

  // constructor(cartItems: CartItem[], total: number) {
  //   this.cartItems = cartItems;
  //   this.total = total;
  // }
}
