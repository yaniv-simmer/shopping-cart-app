import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { name: 'Product 1', price: 10.99, image: 'assets/product2.png' },
    { name: 'Product 2', price: 19.99, image: 'assets/product1.png' }
  ];

  getProducts(): Observable<any[]> {
    return of(this.products);
  }

  addToCart(product: any) {
    this.products.push(product);
  }
}
