import { Product } from "../Product/product.model";

export class CartItem {
  product: Product;
  quantity: number = 1;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}
