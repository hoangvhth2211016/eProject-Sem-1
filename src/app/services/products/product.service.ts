import { Injectable } from '@angular/core';
import { categories } from 'src/app/demoDatas/categoriesList';
import { productsList } from 'src/app/demoDatas/productsList';
import { Category } from 'src/app/models/Category/category.model';
import { Product } from 'src/app/models/Product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: Product[];
  categories!: Category[];


  constructor() { }


  // get all products
  getProducts(): Product[] {
    this.products = productsList;
    return this.products;
  }

  // get a single product by its ID
  getProductById(id: string) {
    for (let i = 0; i < productsList.length; i++) {
      if (productsList[i].id == id) {
        return productsList[i];
      }
    }
    return productsList[productsList.length];
  }

  // get all the products that related to the given product
  getRelatedProduct(product: Product, categories: Category[]): any {
    let arr: Product[] = [];
    this.getProducts().forEach((p) => {
      let check = 0;
      p.categories.forEach((cat) => {
        categories.forEach((element) => {
          if (element.name === cat.name) {
            check = 1;
          }
        });
      });
      if (check === 1 && p.id !== product.id) {
        arr.push(p);
      }
    });
    return arr;
  }


  // get the categories
  getProductsCategory(): Category[] {
    return categories;
  }

  // sort the products by category
  sortByCategory(products: Product[], cat: string): Product[] {
    let arr: Product[] = [];
    this.products.forEach((p) => {
      p.categories.forEach((c) => {
        if (c.name === cat) {
          arr.push(p);
        }
      });
    });
    return arr;
  }

  // get all new products
  getNew(): Product[] {
    let arr: Product[] = [];
    arr = this.getProducts().filter(p => p.newArrival);
    return arr;
  }

  // get all offer products
  getOffer(): Product[] {
    let arr: Product[] = [];
    arr = this.getProducts().filter(p => p.offer);
    return arr;
  }

}
