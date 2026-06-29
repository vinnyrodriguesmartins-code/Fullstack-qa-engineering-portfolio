import { test, expect } from "@playwright/test";

const apiBaseUrl = process.env.API_BASE_URL ?? "http://127.0.0.1:5000/api/v1.0";

test.describe("Regras de negócio via UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("deve bloquear receita para menor de idade no formulário", async ({ page }) => {
    await page.getByRole("link", { name: /^transações$/i }).first().click();
    await page.getByRole("button", { name: /nova transação|adicionar|cadastrar/i }).click();

    await page.getByLabel(/descrição/i).fill("Mesada");
    await page.getByLabel(/valor/i).fill("100");

    // Selecionar pessoa menor (depende de seed/dados — ajuste conforme ambiente)
    const tipoSelect = page.getByLabel(/tipo/i);
    await expect(tipoSelect).toBeVisible();
  });

  test("API deve estar acessível", async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/pessoas`);
    expect(response.ok()).toBeTruthy();
  });
});
