import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product/product.model';
import { ComparisonService } from 'src/app/services/compare/comparison.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {
  products!: Product[];

  constructor(private comparisonService: ComparisonService) { }
  ngOnInit(): void {
    this.products = this.comparisonService.compareList;
  }

  removeFromCompareList(index: number) {
    this.comparisonService.removeFromCompareList(index);
  }
}
