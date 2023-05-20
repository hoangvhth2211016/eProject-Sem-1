import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category/category.model';
import { Product } from 'src/app/models/Product/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ComparisonService } from 'src/app/services/compare/comparison.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  product!: Product;
  category!: Category[];
  products!: Product[];
  productForm: FormGroup = this.formBuilder.group({
    quantity: [1, [Validators.required, Validators.pattern("^[0-9]*$")]]
  });


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private comparisonService: ComparisonService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router) {

  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.product = this.productService.getProductById(params['id']);
      }
      this.products = this.productService.getRelatedProduct(
        this.product,
        this.product.categories
      );
    });
  }

  // add product to compare list
  addToCompareList(p: Product) {
    this.comparisonService.addToCompareList(p);
  }

  // add to cart
  onSubmit() {
    if (this.productForm.invalid) {
      console.log('invalid');
    } else {
      this.cartService.addToCart(this.product, this.productForm.value.quantity);
      this.router.navigateByUrl('/cart');
    }
  }
}
