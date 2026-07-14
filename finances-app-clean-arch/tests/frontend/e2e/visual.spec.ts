import { test, expect } from "@playwright/test";

test.describe("Regressão Visual (Snapshot Testing)", () => {
  test.beforeEach(async ({ page }) => {
    // Acessa a página raiz e espera a carga completa dos dados
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("a página inicial deve corresponder ao layout base (Desktop Viewport)", async ({ page }) => {
    // Define um tamanho de janela estável para capturas idênticas
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Oculta elementos dinâmicos se existirem (ex: gráficos com animações, datas dinâmicas) 
    // para evitar falsos negativos nos testes de comparação de imagem.
    // Exemplo de uso de mask:
    // await expect(page).toHaveScreenshot("dashboard-home.png", { mask: [page.locator(".dynamic-chart")] });
    
    await expect(page).toHaveScreenshot("dashboard-home.png", {
      maxDiffPixelRatio: 0.02, // Permite tolerância de até 2% de pixels diferentes devido a renderização de fontes
      animations: "disabled",  // Desativa animações CSS para manter a captura estática
    });
  });

  test("a aba de transações e sua modal de cadastro devem estar corretas visualmente", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Navega para a aba de transações
    await page.getByRole("link", { name: /^transações$/i }).first().click();
    await page.waitForLoadState("networkidle");

    // Valida a tela de listagem de transações vazia ou preenchida
    await expect(page).toHaveScreenshot("transactions-list.png", {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });

    // Abre a modal
    const newTransactionBtn = page.getByRole("button", { name: /nova transação|adicionar|cadastrar/i });
    await newTransactionBtn.click();
    
    const formLocator = page.locator("form");
    await expect(formLocator).toBeVisible();

    // Valida apenas a modal em si (Snapshot focado em componente/locator)
    await expect(formLocator).toHaveScreenshot("new-transaction-modal.png", {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    });
  });
});
