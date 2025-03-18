import { Injectable } from '@angular/core';
import { Product } from '../../modules/product.model';

@Injectable()
export class CartService {
  private cartKey = 'shoppingCart';
  private cartItems: Product[] = [];

  constructor() {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  addToCart(product: Product): void {
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
