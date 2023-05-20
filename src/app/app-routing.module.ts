import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/mains/about/about.component';
import { CartComponent } from './components/mains/cart/cart.component';
import { ContactComponent } from './components/mains/contact/contact.component';
import { MessageComponent } from './components/mains/message/message.component';
import { ComparisonComponent } from './components/mains/products_area/comparison/comparison.component';
import { DetailComponent } from './components/mains/products_area/detail/detail.component';
import { ProductsComponent } from './components/mains/products_area/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'categories/:name', component: ProductsComponent },
  { path: 'products/comparison', component: ComparisonComponent },
  { path: 'products/:id', component: DetailComponent },
  { path: 'message', component: MessageComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
