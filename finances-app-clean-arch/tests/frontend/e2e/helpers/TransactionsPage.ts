import { Page, Locator, expect } from "@playwright/test";

/**
 * Classe que representa a página de Transações utilizando o padrão Page Object Model (POM).
 * Encapsula locators e interações para garantir reusabilidade e facilidade de manutenção.
 */
export class TransactionsPage {
  readonly page: Page;
  readonly transactionsLink: Locator;
  readonly newTransactionButton: Locator;
  readonly descriptionInput: Locator;
  readonly valueInput: Locator;
  readonly personSelect: Locator;
  readonly ageWarningText: Locator;
  readonly typeSelect: Locator;
  readonly receiptOption: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators mapeados usando melhores práticas (getByRole, getByLabel e seletores semânticos)
    this.transactionsLink = page.getByRole("link", { name: /^transações$/i }).first();
    this.newTransactionButton = page.getByRole("button", { name: /nova transação|adicionar|cadastrar/i });
    this.descriptionInput = page.getByLabel(/descrição/i);
    this.valueInput = page.getByLabel(/valor/i);
    this.personSelect = page.locator("#pessoa-select");
    this.ageWarningText = page.locator("text=Menores só podem registrar despesas.");
    this.typeSelect = page.locator("#tipo");
    this.receiptOption = page.locator('#tipo option[value="receita"]');
  }

  /**
   * Navega para a aba de transações.
   */
  async navigateToTransactions() {
    await this.transactionsLink.click();
  }

  /**
   * Abre a modal para criar uma nova transação.
   */
  async clickNewTransaction() {
    await this.newTransactionButton.click();
  }

  /**
   * Preenche a descrição da transação.
   */
  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  /**
   * Preenche o valor monetário da transação.
   */
  async fillValue(value: string) {
    await this.valueInput.fill(value);
  }

  /**
   * Digita e seleciona a pessoa na combobox dinâmica de sugestões.
   */
  async selectPerson(name: string) {
    await this.personSelect.click();
    await this.personSelect.fill(name);
    // Seleciona a opção respectiva que surge na caixa de listagem
    await this.page.locator(`role=option[name="${name}"]`).click();
  }

  /**
   * Valida se a mensagem de bloqueio para menores é exibida.
   */
  async assertAgeWarningVisible() {
    await expect(this.ageWarningText).toBeVisible();
  }

  /**
   * Valida se a opção do tipo 'Receita' está desabilitada para menor de idade.
   */
  async assertReceiptOptionDisabled() {
    await expect(this.receiptOption).toBeDisabled();
  }
}
