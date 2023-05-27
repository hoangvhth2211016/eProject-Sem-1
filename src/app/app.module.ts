import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { BannerComponent } from './components/mains/banner/banner.component';
import { AboutComponent } from './components/mains/about/about.component';
import { ContactComponent } from './components/mains/contact/contact.component';
import { ProductsComponent } from './components/mains/products_area/products/products.component';
import { DetailComponent } from './components/mains/products_area/detail/detail.component';
import { ComparisonComponent } from './components/mains/products_area/comparison/comparison.component';
import { HomeComponent } from './components/mains/home/home.component';
import { MessageComponent } from './components/mains/message/message.component';
import { ProductCardsComponent } from './components/mains/products_area/product-cards/product-cards.component';
import { CartComponent } from './components/mains/cart/cart.component';
import { CheckoutComponent } from './components/mains/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    DetailComponent,
    ComparisonComponent,
    HomeComponent,
    MessageComponent,
    ProductCardsComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
