import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should render hero and counters', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Autenticidade. Estratégia. Poder.' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ver projetos' })).toBeVisible();
    const counters = page.locator('app-metrics-counter');
    await expect(counters).toHaveCount(3);
  });
});

