import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Acessibilidade Digital (a11y) — WCAG 2.1 Compliance", () => {
  test.beforeEach(async ({ page }) => {
    // Acessa a página principal do Finances App
    await page.goto("/");
    // Espera até que a página esteja totalmente carregada (com os elementos SPA renderizados)
    await page.waitForLoadState("networkidle");
  });

  test("a página principal não deve ter violações críticas ou sérias de acessibilidade", async ({ page }) => {
    // Cria o analisador do Axe
    const accessibilityScanResults = await new AxeBuilder({ page })
      // Configura para rodar com as tags padrão de WCAG 2.0 e 2.1 nível A/AA
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = accessibilityScanResults.violations;

    // Filtra para reportar apenas violações de impacto 'critical' ou 'serious' no console caso falhe
    if (violations.length > 0) {
      console.warn("Violações de acessibilidade detectadas:");
      violations.forEach((violation) => {
        console.warn(`[${violation.impact?.toUpperCase()}] Rule: ${violation.id} - ${violation.description}`);
        console.warn(`Help URL: ${violation.helpUrl}`);
        violation.nodes.forEach((node) => {
          console.warn(`  Element: ${node.html}`);
          console.warn(`  Target: ${node.target}`);
        });
      });
    }

    // Asserção sênior: não podemos ter violações WCAG na tela principal
    expect(violations).toEqual([]);
  });

  test("o formulário de nova transação deve ser acessível", async ({ page }) => {
    // Navega para a área de Transações
    await page.getByRole("link", { name: /^transações$/i }).first().click();
    
    // Abre a modal/formulário de criação
    const newTransactionBtn = page.getByRole("button", { name: /nova transação|adicionar|cadastrar/i });
    await newTransactionBtn.click();
    
    // Aguarda a renderização do formulário
    await page.waitForSelector("form");

    // Executa a varredura focando apenas na modal/formulário de transações para isolamento
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("form")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
