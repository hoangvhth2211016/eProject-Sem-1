import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from 'src/app/models/Category/category.model';
import { Product } from 'src/app/models/Product/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  categories: Category[] = [];
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
  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product[]>(this.productsUrl).pipe(map(products => {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          return products[i];
        }
      }
      return products[products.length];
    }))
  }

  // get all the products that related to the given product
  getRelatedProduct(product: Product): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl).pipe(map(products => {
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

  getProductsByCategory(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl).pipe(map(products => {
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
    return this.httpClient.get<Product[]>(this.productsUrl).pipe(map(products => {
      return products.filter(product => product.newArrival);
    }));
  }

  // get all offer products
  getOffer(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl).pipe(map(products => {
      return products.filter(product => product.offer);
    }));
  }
}
