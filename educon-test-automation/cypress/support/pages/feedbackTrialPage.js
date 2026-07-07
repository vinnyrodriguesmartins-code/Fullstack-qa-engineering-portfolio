class feedbackTrialPage {
  
    constructor() {

      this.tabAprender = '[data-cy="tab-link"]';
      this.botaoTrialFeedback = '[data-cy="button-course-course-sponsored-button-1"]' 
      this.tituloAvaliacao = '[data-cy="headline-title"]'
      this.inputComentario = '[data-cy="input-feedback"]'
      this.botaoRecarregar = '[data-cy="button-error-retry-button"]'
      this.botaoX = '[data-cy="drawer-close-button"]'
      
    }
    
  
    acessarTabAprender() {
      cy.visit('https://areaaluno.educon-stg.afya.systems/aprender')
      cy.url().should('include', '/aprender')
      cy.get(this.tabAprender)
        .should('contain.text', 'Aprender')
        .log('✅ Página carregada')
    }

    clicarBotaoTrialFeedback() {
      cy.get(this.botaoTrialFeedback)
        .should('be.visible')
        .click()
        .log('✅ Formulário acessado');
    }

    acessarAvaliacao() {
      cy.get(this.tituloAvaliacao)
        .contains ('Avalie o período de teste')
        .should('be.visible')
        .log('✅ Responder avaliação')
    }

    avaliarNota(text) {
      cy.get('div')
        .contains(text)
        .should('be.visible')
        .click({ force: true })
        .log('✅ Nota selecionada')
    }

    clicarBotaoProximo() {
      cy.contains('button','Próximo')
        .should('be.visible')
        .click({ force: true })
    }
    
    clicarBotaoVoltar() {
      cy.contains('button','Voltar')
        .should('be.visible')
        .click({ force: true })
        .log('✅ Retorna para a tela de nota')
    }  

    clicarBotaoEnviarFeedback() {
      cy.contains('button','Enviar feedback')
        .should('be.visible')
        .click({ force: true })
    }
    
    preencherComentario(text) {
      cy.get(this.inputComentario)
        .should('be.visible')
        .click({ force: true })
        .type(text)
    }

    validarToast(text) {
      cy.get('div')
        .contains(text)
        .should('be.visible')
        .then(() => {
        cy.log('✅ Toast exibido corretamente');
      });
    }

    clicarBotaoFechar() {
      cy.contains('button','Fechar')
        .should('be.visible')
        .click({ force: true })
    }

    clicarBotaoRecarregar() {
      cy.get(this.botaoRecarregar)
        .contains('Recarregar')
        .should('be.visible')
        .click({ multiple: true })
    }

    adquirirCurso(text) {
      cy.get('div')
        .contains(text)
        .should('be.visible')
        .click({ force: true })
        .log('✅ Opção selecionada')
    }

    clicarBotaoX(){
      cy.get(this.botaoX)
        .should('be.visible')
        .click({ force: true })
  }
}
  export default feedbackTrialPage;
  