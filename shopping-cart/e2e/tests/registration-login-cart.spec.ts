import { test, expect } from '@playwright/test';

const email = 'test@example.com';
const password = 'Password1';
const URL = 'http://localhost:4200';

test('User Flow', async ({ page }) => {
  // User Registration
  await page.goto(URL + '/register');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.fill('input[formControlName="confirmPassword"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(URL + '/login');

  // AuthGuard
  await page.goto(URL + '/app/products');
  await expect(page).toHaveURL(URL + '/login');

  // User Login
  await page.goto(URL + '/login');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(URL + '/app/products');

  // Add Product to Cart
  await page.click('a[routerLink="/app/products"]');
  await page.click('button:has-text("Add")');
  await page.click('a[routerLink="/app/cart"]');
  await expect(page.locator('.product-card')).toHaveCount(1);

  // Log out and then log in again to check if the cart still has the product
  await page.click('button:has-text("Logout")');
  await page.goto(URL + '/login');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(URL + '/app/await page.locator('div').filter({ hasText: /^Ferrari hat\$14\.99Add$/ }).getByRole('button').click();products');

  await page.click('a[routerLink="/app/cart"]');
  await expect(page.locator('.product-card')).toHaveCount(1);
});