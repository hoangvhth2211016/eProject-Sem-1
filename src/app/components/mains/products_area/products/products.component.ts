import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product/product.model';
import { ProductService } from 'src/app/services/products/product.service';
import { Category } from 'src/app/models/Category/category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  categories!: Category[];
  someProducts: Product[] = [];

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService) {

  }

  ngOnInit() {
    this.categories = this.productService.getProductsCategory();
    for (let i = 0; i < 3; i++) {
      this.someProducts.push(this.productService.getProducts()[i]);
    }
    this.activateRoute.params.subscribe((params) => {
      const name: string = params['name'];
      if (!name) {
        this.products = this.productService.getProducts();
      }
      if (name === 'all-products') {
        this.products = this.productService.getProducts();
      } else if (name === 'special-offers') {
        this.products = this.productService.getOffer();
      } else if (name === 'new-arrivals') {
        this.products = this.productService.getNew();
      } else {
        this.products = this.productService.sortByCategory(
          this.productService.getProducts(),
          name
        );
      };
    });
  }

  // activate the sorting products function by category
  sortProducts(name: string) {
    this.products = this.productService.sortByCategory(
      this.products,
      name
    );
  }

  getAll() {
    this.products = this.productService.getProducts();
  }

}
