import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart/cart.model';
import { Product } from 'src/app/models/Product/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ComparisonService } from 'src/app/services/compare/comparison.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  compareList!: Product[];
  cart!: Cart;

  constructor(private comparisonService: ComparisonService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.comparisonService.observeCompareList().subscribe(list => {
      this.compareList = list;
    });
    this.cartService.observeCart().subscribe(cart => {
      this.cart = cart;
    })
  }
}
