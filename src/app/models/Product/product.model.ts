import { Category } from "../Category/category.model";

export class Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  categories: Category[];
  offer: boolean = false;
  newArrival: boolean = false;
  size: string;
  weight: string;
  origin: string;

  constructor(id: string, name: string, description: string, image: string, price: number, categories: Category[], offer: boolean, newArrival: boolean, size: string, weight: string, origin: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.categories = categories;
    this.offer = offer;
    this.newArrival = newArrival;
    this.size = size;
    this.weight = weight;
    this.origin = origin;
  }
}
