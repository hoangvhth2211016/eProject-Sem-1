import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from 'src/app/models/Category/category.model';
import { Product } from 'src/app/models/Product/product.model';
import { Message } from 'src/app/models/Message/message.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: Product[];
  categories!: Category[];
  productsUrl: string = 'assets/datas/products.json';
  categoriesUrl: string = 'assets/datas/categories.json';

  constructor(private httpClient: HttpClient) { }

  // get all products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl);
  }

  // get the categories
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoriesUrl);
  }

  // get a single product by its ID
  getProductById(id: string): Observable<Product | undefined> {
    return this.getProducts().pipe(map(products => {
      const product = products.find(p => p.id === id);
      if (product) {
        return product;
      } else {
        return;
      }
    }))
  }

  // get all the products that related to the given product
  getRelatedProduct(product: Product): Observable<Product[]> {
    return this.getProducts().pipe(map(products => {
      let arr: Product[] = [];
      products.forEach((p) => {
        let check = 0;
        p.categories.forEach((cat) => {
          product.categories.forEach((element) => {
            if (element.name === cat.name) {
              check = 1;
            }
          });
        });
        if (check === 1 && p.id !== product.id && arr.length < 4) {
          arr.push(p);
        }
      });
      return arr;
    }));

  }

  // get products by category
  getProductsByCategory(name: string): Observable<Product[]> {
    return this.getProducts().pipe(map(products => {
      let arr: Product[] = [];
      products.forEach(p => {
        p.categories.forEach(cat => {
          if (cat.name === name) {
            arr.push(p);
          }
        })
      })
      return arr;
    }))
  }

  // get all new products
  getNew(): Observable<Product[]> {
    return this.getProducts().pipe(map(products => {
      return products.filter(product => product.newArrival);
    }));
  }

  // get all offer products
  getOffer(): Observable<Product[]> {
    return this.getProducts().pipe(map(products => {
      return products.filter(product => product.offer);
    }));
  }
}
