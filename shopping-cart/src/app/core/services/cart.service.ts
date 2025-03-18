import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  private cartKey = 'shoppingCart';
  private cartItems: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(product: any): void {
    //TODO: Check if the product is already in the cart, if so, increase the quantity
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
