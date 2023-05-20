import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product/product.model';
import { ComparisonService } from 'src/app/services/compare/comparison.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent {
  @Input() products!: Product[];
  constructor(private productService: ProductService, private comparisonService: ComparisonService) {

  }

  addToCompareList(p: Product, event: any) {
    event.stopPropagation();
    this.comparisonService.addToCompareList(p);
  }
}
