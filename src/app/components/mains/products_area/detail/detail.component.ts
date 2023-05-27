import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import * as Doc from 'docx';

import { Category } from 'src/app/models/Category/category.model';
import { Product } from 'src/app/models/Product/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ComparisonService } from 'src/app/services/compare/comparison.service';
import { DocService } from 'src/app/services/document/doc.service';
import { ProductService } from 'src/app/services/products/product.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  product!: Product;
  category!: Category[];
  relatedProducts!: Product[];
  productForm: FormGroup = this.formBuilder.group({
    quantity: [1, [Validators.required, Validators.pattern("^[0-9]*$")]]
  });
  productImage!: ArrayBuffer;
  logo!: ArrayBuffer;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private comparisonService: ComparisonService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    private docService: DocService
  ) {

  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProductById(params['id']).subscribe(product => {
          this.product = product;
          this.productService.getRelatedProduct(product).subscribe(products => {
            this.relatedProducts = products;
          });
          this.docService.getImage(this.product.image).subscribe(buffer => {
            this.productImage = buffer;
          });
          this.docService.getImage('/assets/images/logo-image.jpg').subscribe(buffer => {
            this.logo = buffer;
          });
        })
      }
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


  // download document
  downloadDoc() {
    const document = this.docService.createDocument(this.productImage, this.logo, this.product);
    Doc.Packer.toBlob(document).then(blob => {
      let name = this.product.name.trim();
      saveAs(blob, `${name}.docx`);
    })
  }
}
