import { test, expect } from '@playwright/test';

const email = 'test@example.com';
const password = 'Password1';
const URL = 'http://localhost:4200';

test('User Registration', async ({ page }) => {
  await page.goto(URL + '/register');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.fill('input[formControlName="confirmPassword"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(URL + '/login');
});

test('AuthGuard', async ({ page }) => {
  await page.goto(URL + '/app/products');
  await expect(page).toHaveURL(URL + '/login');
});

test('User Login', async ({ page }) => {
  await page.goto(URL + '/login');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(URL + '/app/products');
});

test('Add Product to Cart', async ({ page }) => {
  await page.goto(URL + '/login');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(URL + '/app/products');

  await page.click('a[routerLink="/app/products"]');
  await page.click('button:has-text("Add")');
  await page.click('a[routerLink="/app/cart"]');
  await expect(page.locator('.cart-item')).toHaveCount(1);

  // log out and then log in again to check if the cart still has the product
  await page.click('button:has-text("Logout")');
  await page.goto(URL + '/login');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(URL + '/app/products');

  await page.click('a[routerLink="/app/cart"]');
  await expect(page.locator('.cart-item')).toHaveCount(1);
});
