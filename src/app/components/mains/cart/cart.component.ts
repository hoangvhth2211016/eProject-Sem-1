import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
}
