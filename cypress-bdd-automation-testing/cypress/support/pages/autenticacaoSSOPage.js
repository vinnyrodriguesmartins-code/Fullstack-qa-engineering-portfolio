class autenticacaoSSOPage {
  
    constructor() {

      this.botaoSair = '[data-cy="sign-out-button"]';
      this.inputEmail = '#email';
      this.inputSenha = '#password';
      this.buttonEntrar = '.submit-button';
    }
  
    acessarPaginaInicial(){
      cy.url()
        .should('include', '/sign-in')
      cy.contains('h1','Bem-vindo à plataforma')
        .should('be.visible')
        .log('✅ Página Inicial Afya carregada')
    }

    clicarBotaoEntrarComSSO() {
      cy.contains('button', 'Entrar com SSO')
        .should('be.visible')
        .click()
        .log('✅ Redirecionado para a página de login via SSO');
    }

    validarRedirecionamentoParaLoginSSO() {
      cy.url().should('include', '/sso-login');
      cy.url().should('include', 'client_id=be556401-cf0f-4130-aab7-d20a446f3a76');
      cy.log('✅ Redirecionamento para página de login SSO validado');
    }

    validarLoginComSucesso() {
      const email = Cypress.env("LoginNovaLLL_Marcos")?.email || "marcos.pereira@example.com";
      cy.contains("span", `Aluno: ${email}`)
        .log("✅ Login via SSO com autenticação bem-sucedida");
    }

    validarAreaLogada() {
      cy.visit('/profile')
      cy.url().should('include', '/profile');
      cy.contains('h1', 'Perfil do Aluno')
        .should('be.visible')
        .log('✅ Perfil do aluno acessado com sucesso');
      }

    interceptarRequisicaoLogin() {
      cy.intercept('POST', '**/login').as('loginRequest');
    }

    preencherLoginComCredenciaisInvalidas() {
      cy.get(this.inputEmail)
        .should('exist')
        .type("usuario-invalido@example.com")
        .wait(2000);

      cy.get(this.inputSenha)
        .should('exist')
        .type("SenhaIncorreta999")
        .wait(2000);

      cy.get(this.buttonEntrar)
        .should('exist')
        .click({ force: true })
        .wait(2000);  
    }

    validarLoginComCredenciaisInvalidas() {
      cy.wait('@loginRequest').then(({ response }) => {
        expect(response.statusCode).to.eq(401);
        expect(response.body.message).to.eq('Credenciais inválidas');
      cy.log('✅ Login com credenciais inválidas corretamente bloqueado');
      });
    }
  
    acessarRotaProtegida() {
      cy.contains('a', 'Dashboard')
        .should('be.visible')
        .click();
    }
    
    validarRedirecionamentoAoAcessarRotaProtegida() {
      cy.url().should('include', '/sign-in');
      cy.log('✅ Acesso negado a rota protegida sem login - redirecionamento funcionou');
    }

    clicarBotaoSair() {
      cy.get(this.botaoSair)
        .should('exist')
        .click();
    }

  }

  export default autenticacaoSSOPage;
  