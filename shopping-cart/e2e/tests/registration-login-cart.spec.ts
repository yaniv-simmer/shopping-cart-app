import { test, expect } from '@playwright/test';

test('Registration, Login, Add to Cart & View Cart', async ({ page }) => {
  // Navigate to registration page
  await page.goto('http://localhost:4200/register');
  await page.fill('input[formControlName="email"]', 'test@example.com');
  await page.fill('input[formControlName="password"]', 'Password1');
  await page.fill('input[formControlName="confirmPassword"]', 'Password1');
  await page.click('button[type="submit"]');

  // Navigate to login page (if not automatically redirected)
  await page.goto('http://localhost:4200/login');
  await page.fill('input[formControlName="email"]', 'test@example.com');
  await page.fill('input[formControlName="password"]', 'Password1');
  await page.click('button[type="submit"]');

  // Expect redirection to application page
  await expect(page).toHaveURL('http://localhost:4200/app/products');

  // Navigate to Products and add a product
  await page.click('a[routerLink="/app/products"]');
  await page.click('button:has-text("Add")');

  // Navigate to Cart and verify item is added
  await page.click('a[routerLink="/app/cart"]');
  await expect(page.locator('.cart-item')).toHaveCount(1);
});
