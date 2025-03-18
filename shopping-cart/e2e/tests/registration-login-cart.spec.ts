import { test, expect } from '@playwright/test';

test.describe('User Flow Tests', () => {
  test('User Registration', async ({ page }) => {
    await page.goto('http://localhost:4200/register');
    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', 'Password1');
    await page.fill('input[formControlName="confirmPassword"]', 'Password1');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:4200/login');
  });

  test('User Login', async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', 'Password1');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:4200/app/products');
  });

  test('Add Product to Cart', async ({ page }) => {
    await page.goto('http://localhost:4200/login');
    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', 'Password1');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:4200/app/products');

    await page.click('a[routerLink="/app/products"]');
    await page.click('button:has-text("Add")');
    await page.click('a[routerLink="/app/cart"]');
    await expect(page.locator('.cart-item')).toHaveCount(1);

    // log out and then log in again to check if the cart still has the product
    await page.click('button:has-text("Logout")');
    await page.goto('http://localhost:4200/login');
    await page.fill('input[formControlName="email"]', 'test@example.com');
    await page.fill('input[formControlName="password"]', 'Password1');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:4200/app/products');

    await page.click('a[routerLink="/app/cart"]');
    await expect(page.locator('.cart-item')).toHaveCount(1);
  });
});