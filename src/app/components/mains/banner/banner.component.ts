import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product/product.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() products!: Product[];
}
