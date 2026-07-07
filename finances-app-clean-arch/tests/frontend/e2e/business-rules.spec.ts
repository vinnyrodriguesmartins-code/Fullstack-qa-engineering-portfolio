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

    // Seleciona pessoa menor (Pedro Oliveira, de 2010, menor de idade)
    const pessoaInput = page.locator("#pessoa-select");
    await pessoaInput.click();
    await pessoaInput.fill("Pedro Oliveira");
    
    // Clica na opção contendo o nome do menor na listbox
    await page.locator('role=option[name="Pedro Oliveira"]').click();

    // Verifica se a mensagem de aviso para menores de idade é exibida
    await expect(page.locator("text=Menores só podem registrar despesas.")).toBeVisible();

    // Verifica se a opção "Receita" do select de Tipo está desabilitada
    const receitaOption = page.locator('#tipo option[value="receita"]');
    await expect(receitaOption).toBeDisabled();
  });

  test("API deve estar acessível", async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/pessoas`);
    expect(response.ok()).toBeTruthy();
  });
});
