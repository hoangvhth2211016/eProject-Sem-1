import { Category } from "../Category/category.model";

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: Category[];

  constructor(id: string, name: string, description: string, price: number, categories: Category[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categories = categories;
  }
}
