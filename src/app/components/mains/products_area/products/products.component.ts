import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/Category/category.model';
import { Product } from 'src/app/models/Product/product.model';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories!: Category[];
  someProducts: Product[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.productService.getProducts().subscribe(products => {
      for (let i = 0; i < 3; i++) {
        this.someProducts.push(products[i]);
      }
    })
    this.route.params.subscribe((params) => {
      const name: string = params['name'];
      if (!name) {
        this.productService.getProducts().subscribe(products => {
          this.products = products
        });
      }
      if (name === 'all-products') {
        this.productService.getProducts().subscribe(products => {
          this.products = products
        });
      } else if (name === 'special-offers') {
        this.productService.getOffer().subscribe(products => {
          this.products = products
        });
      } else if (name === 'new-arrivals') {
        this.productService.getNew().subscribe(products => {
          this.products = products
        });
      } else {
        this.productService.getProductsByCategory(name).subscribe(products => {
          this.products = products
        });
      };
    });
  }

}
