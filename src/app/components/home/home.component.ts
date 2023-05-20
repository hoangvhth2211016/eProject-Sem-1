import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category/category.model';
import { Product } from 'src/app/models/Product/product.model';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  offerProducts!: Product[];
  newProducts!: Product[];
  categories!: Category[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.offerProducts = this.productService.getOffer();
    this.newProducts = this.productService.getNew();
    this.categories = this.productService.getProductsCategory();
  }
}
