import { test, expect } from "@playwright/test";
import { TransactionsPage } from "./helpers/TransactionsPage";

const apiBaseUrl = process.env.API_BASE_URL ?? "http://127.0.0.1:5000/api/v1.0";

test.describe("Regras de negócio via UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("deve bloquear receita para menor de idade no formulário", async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.navigateToTransactions();
    await transactionsPage.clickNewTransaction();

    await transactionsPage.fillDescription("Mesada");
    await transactionsPage.fillValue("100");
    await transactionsPage.selectPerson("Pedro Oliveira");

    // Validações delegadas ao Page Object
    await transactionsPage.assertAgeWarningVisible();
    await transactionsPage.assertReceiptOptionDisabled();
  });

  test("API deve estar acessível", async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/pessoas`);
    expect(response.ok()).toBeTruthy();
  });
});
