import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserInfoService } from 'src/app/services/userInfo/user-info.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('quantity') quantity!: ElementRef;
  cart!: Cart;
  userForm!: FormGroup;
  submitted: boolean = false;

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private userInfoService: UserInfoService, private router: Router) {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^([A-Za-z][a-z]+[ ]*)+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^([A-Za-z][a-z]+[ ]*)+$')]],
      telephone: ['', [Validators.required, Validators.pattern('^([\+]?84)|0[3|5|7|8|9][0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.pattern('^([A-Za-z][a-z]+[ ]*)+$')]],
      country: ['', [Validators.required]],
      postcode: ['', [Validators.required, Validators.pattern('^((0[1-9])|(1[0-9]))0{3}$')]],
      cardholder: ['', [Validators.required, Validators.pattern('^([A-Za-z][a-z]+[ ]*)+$')]],
      cardnumber: ['', [Validators.required, Validators.pattern('^([0-9][0-9][0-9][0-9][ ]*){4}$')]],
      month: ['', [Validators.required, Validators.pattern('(^0[1-9]$)|(^1[0-2]$)')]],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    }, {
      validators: this.cardExpire
    });
  }

  ngOnInit(): void {
    this.cartService.observeCart().subscribe(cart => {
      this.cart = cart;
    })
  }

  // remove a product
  removeProduct(index: number) {
    this.cartService.removeFromCart(index);
  }

  // change product's quanity
  changeQuantity(id: string, qty: string) {
    let quantity: number = 0;
    quantity = (isNaN(Number(qty))) ? 1 : parseInt(qty);
    this.cartService.updateQuantity(id, quantity);
  }

  // validate quantity input
  validateQuantityInput() {
    const value = parseInt(this.quantity.nativeElement.value);
    if (isNaN(value) || value === 0) {
      this.quantity.nativeElement.value = '1';
    }
  }

  // validate card expiry
  cardExpire(control: AbstractControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const inputYear = control.get('year')?.value;
    const inputMonth = control.get('month')?.value;
    const inputYearAsNr = Number(inputYear);
    const inputMonthAsNr = Number(inputMonth) - 1;

    if (!inputMonth || !inputYear) {
      return null;
    }

    if (inputYearAsNr === currentDate.getFullYear()) {
      if (inputMonthAsNr <= currentDate.getMonth()) {
        return { expired: true };
      } else {
        return null;
      }
    } else if (inputYearAsNr < currentDate.getFullYear()) {
      return { expired: true };
    } else {
      return null;
    }
  }

  // form checkout
  checkout() {
    this.submitted = true;
    if (this.cart.cartProducts.length === 0) {
      alert("Can't checkout if their is nothing to checkout!");
    } else if (this.userForm.invalid) {
      console.log("form invalid");
    } else {
      const user = this.userForm.value;
      this.userInfoService.addUser(
        user.firstname,
        user.lastname,
        user.telephone,
        user.email,
        user.address,
        user.city,
        user.country,
        user.postcode,
        user.cardholder,
        user.cardnumber,
        user.month,
        user.year,
        user.cvv
      );
      this.router.navigateByUrl('/cart/checkout');
    }
  }
}
