import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable()
export class CartService {
  private cartKey = 'shoppingCart';
  private cartItems: any[] = [];

  constructor() {
    // Load existing cart from localStorage if available
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(product: any): void {
    this.cartItems.push(product);
    this.updateLocalStorage();
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.updateLocalStorage();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }
}
