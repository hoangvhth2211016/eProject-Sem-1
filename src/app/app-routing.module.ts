import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/mains/about/about.component';
import { ContactComponent } from './components/mains/contact/contact.component';
import { ComparisonComponent } from './components/mains/products_area/comparison/comparison.component';
import { DetailComponent } from './components/mains/products_area/detail/detail.component';
import { NewArrivalComponent } from './components/mains/products_area/new-arrival/new-arrival.component';
import { ProductsComponent } from './components/mains/products_area/products/products.component';
import { SalesComponent } from './components/mains/products_area/sales/sales.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'categories/all-products', component: ProductsComponent },
  { path: 'categories/sales', component: SalesComponent },
  { path: 'categories/new-arrivals', component: NewArrivalComponent },
  { path: 'products/comparison', component: ComparisonComponent },
  { path: 'products/:id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
