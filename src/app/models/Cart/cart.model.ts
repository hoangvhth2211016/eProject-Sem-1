import { CartProduct } from "../CartProduct/cart-product.model";

export class Cart {
  cartProducts: CartProduct[] = [];
  subTotal: number = 0;
  shippingFee: number = 0;
  total: number = 0;
}
