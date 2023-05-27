import { Product } from "../Product/product.model";

export class CartProduct {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}
