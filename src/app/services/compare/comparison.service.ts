import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/Product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  compareList!: Product[];
  compareSubject: BehaviorSubject<Product[]>;

  constructor() {
    this.compareList = this.getCompareList();
    this.compareSubject = new BehaviorSubject(this.compareList);
  }

  // get compare list from local storage
  getCompareList(): Product[] {
    const compareListJson = localStorage.getItem('CompareList');
    return (compareListJson) ? JSON.parse(compareListJson) : [];
  }
  // set compare list from local storage
  setCompareList() {
    const compareListJson = JSON.stringify(this.compareList);
    localStorage.setItem('CompareList', compareListJson);
    this.compareSubject.next(this.compareList);
  }

  // observe compare list
  observeCompareList(): Observable<Product[]> {
    return this.compareSubject.asObservable();
  }

  // add to compare list
  addToCompareList(p: Product) {
    let checker = false;
    if (this.compareList.length < 2) {
      this.compareList.forEach(product => {
        if (product.id === p.id) {
          checker = true;
          alert('The product is already on the list');
        }
      });
      if (checker == false) {
        this.compareList.push(p);
      }
    } else {
      alert('The Compare List is full');
    }
    this.setCompareList();
  }

  // remove from compare list
  removeFromCompareList(index: number) {
    this.compareList.splice(index, 1);
    this.setCompareList();
  }
}
