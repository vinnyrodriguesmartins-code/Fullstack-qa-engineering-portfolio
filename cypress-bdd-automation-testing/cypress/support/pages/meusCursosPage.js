class meusCursosPage {
  
    constructor() {

      this.tabAprender = '[data-cy="tab-link"]';
      this.botaoRecarregar = '[data-cy="button-error-retry-button"]'
      this.meusCursos = '[data-cy="courses-grid"]'
      this.drawerMeusCursos = '[data-cy="headline-title"]'
      this.botaoFecharDrawer = '[data-cy="drawer-close-button"]'
      this.botaoPesquisar = '[data-cy="drawer-search-button"]'
      this.inputPesquisar = '[data-cy="input-search"]'
      this.drawer = '[data-cy="drawer-content"]'
      this.imagemNenhumResultado = '[data-cy="not-found-list-item-image"]'
      this.mensagemNenhumResultado = '[data-cy="not-found-list-item"]'
      this.cursoDermatologia = '[data-cy="course-list-item-course-dermatology"]'
      this.botaoDespriorizar = '[data-cy="courses-list-item-unpin-button"]'
      this.cursoEmDestaque = '[data-cy="course-list-Cursos em destaque"]'
      this.outrosCursos = '[data-cy="list-header-label"]'
      this.botaoDestacar = '[data-cy="courses-list-item-onpin-button"]'
      this.buble = '[data-cy="bubble-pin-course"]'

    }

    acessarTabAprender() {
      cy.visit('/aprender')
      cy.url().should('include', '/aprender')
      cy.get(this.tabAprender)
        .should('contain.text', 'Aprender')
        .log('✅ Página carregada')
    }

    clicarBotaoRecarregar() {
      cy.get(this.botaoRecarregar)
        .contains('Recarregar')
        .should('be.visible')
        .click({ multiple: true })    }

    visualizarMeusCursos() {
      cy.get(this.meusCursos)
        .should('be.visible')
        .log('✅ Meus Cursos carregado')
    }

    clicarBotaoVerTodos() {
      cy.contains('button' , 'Ver todos')
        .should('be.visible')
        .click({ force: true })
    }

    visualizarDrawerMeusCursos() {
      cy.get(this.drawerMeusCursos)
        .contains('Meus cursos')
        .should('be.visible')
        .log('✅ Drawer Meus Cursos carregado')
    }

    clicarFiltros(text) {
      cy.get('#drawer button')
        .contains(new RegExp("^" + text + "$"))
        .scrollIntoView({ block: 'center', inline: 'center' })
        .should('be.visible')
        .click({ force: true })
    }

    clicarBotaoPesquisar(){
      cy.get(this.botaoPesquisar)
        .should('be.visible')
        .click()
        .log('✅ Botão de pesquisa clicado');
    }

    clicarBotaoX(){
      cy.get(this.drawer)
        .find(this.botaoFecharDrawer)
        .scrollIntoView({ block: 'center', inline: 'center' })
        .should('be.visible')
        .click({ force: true })
        .log('✅ Fechar Drawer Meus Cursos');
    }

    clicarInputPesquisar(text){
      cy.get(this.inputPesquisar)
        .should('be.visible')
        .type(text)
        .log(`✅ Buscando cursos por: ${text}`);
    }

    clicarInputInvalido(){
      cy.get(this.inputPesquisar)
        .should('be.visible')
        .type('testeee')
        .log('✅ Buscando cursos por: testeee');
    }

    validarMensagemNenhumResultado() {
      cy.get(this.imagemNenhumResultado)
        .should('be.visible')

      cy.get(this.mensagemNenhumResultado)  
        .should('be.visible')
        .and('have.text', 'Não encontramos resultados para essa busca')
        .log('✅ Mensagem de nenhum resultado encontrada');
    }

    clicarBotaoDespriorizar() {
      cy.get(this.cursoEmDestaque)
        .should('be.visible')
        .within(() => {
          cy.get(this.cursoDermatologia)
            .should('be.visible')
            .realHover();
          cy.get(this.botaoDespriorizar)
            .should('be.visible')
            .click({ force: true });
        });
      cy.log('✅ Botão Despriorizar clicado');
    }

    clicarBotaoDestacar() {
      cy.get(this.outrosCursos)
        .should('be.visible')
        .within(() => {
          cy.contains('Dermatologia')
            .scrollIntoView()
            .should('be.visible');
          cy.get(this.cursoDermatologia)
            .should('be.visible')
            .realHover();
          cy.get(this.botaoDestacar)
            .should('be.visible')
            .click({ force: true });
        });
      cy.log('✅ Botão Destacar clicado');
    }

  clicarBotaoBuble() {
    cy.contains('p', 'Você precisa substituir um dos cursos abaixo para destacar')
      .should('be.visible')

    cy.get(this.buble)              
      .find('button')         
      .first()                
      .click({ force: true })
      .log('✅ Curso selecionado no bubble');
  }

  validarCursoSubstituido() {
    cy.get('body').then(($body) => {
      const destaqueHidden = !$body.find(this.cursoEmDestaque).is(':visible');
      const outrosHidden = !$body.find(this.outrosCursos).is(':visible');

      if (destaqueHidden) {
        cy.get(this.cursoEmDestaque).should('not.be.visible')
          .log('✅ Curso despriorizado e removido dos destaques');
      } else if (outrosHidden) {
        cy.get(this.outrosCursos).should('not.be.visible')
          .log('✅ Curso destacado e removido de outros cursos');
      }
    });
  }

  priorizarCurso() {
    cy.get('body').then(($body) => {

      const estaEmDestaque = $body.find(this.cursoEmDestaque).is(':visible');

      if (estaEmDestaque) {
        cy.log('Curso está nos destaques. Despriorizando...');
        this.clicarBotaoDespriorizar();
      }

    });

    cy.get('body').then(($body) => {

      const estaNosOutrosCursos = $body.find(this.outrosCursos).is(':visible');

      if (estaNosOutrosCursos) {
        cy.log('Curso está nos outros cursos. Destacando...');
        this.clicarBotaoDestacar();

        cy.contains('p', 'Você precisa substituir um dos cursos abaixo para destacar')
          .should('be.visible');

        this.clicarBotaoBuble();
      }
    });

    this.validarCursoSubstituido();
  }
}

  export default meusCursosPage;