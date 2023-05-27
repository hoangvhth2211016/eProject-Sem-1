import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart/cart.model';
import { UserInfo } from 'src/app/models/UserInfo/user-info.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { UserInfoService } from 'src/app/services/userInfo/user-info.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user!: UserInfo;
  cart!: Cart;
  constructor(private userInfoService: UserInfoService, private cartService: CartService, private router: Router, private messageService: MessagesService) {

  }

  ngOnInit(): void {
    this.cartService.observeCart().subscribe(cart => {
      this.cart = cart;
    })
    this.user = this.userInfoService.getUserInfo();
  }

  confirmPurchase() {
    this.messageService.setMessage("Thank you for your purchase!", "Your will be processed and sent shortly.");
    this.cartService.clearCart();
    this.userInfoService.removeUser();
    this.router.navigateByUrl('/message');
  }
}
