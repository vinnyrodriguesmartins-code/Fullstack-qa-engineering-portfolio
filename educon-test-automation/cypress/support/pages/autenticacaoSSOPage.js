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
      cy.url().should('include', 'https://sso-account.staging.afya.systems/login');
      cy.url().should('include', 'client_id=be556401-cf0f-4130-aab7-d20a446f3a76');
      cy.url().should('include', 'redirect_uri=https%3A%2F%2Fareaaluno.educon-stg.afya.systems%2Fauth%2Fcallback&state=');
      cy.log('✅ Redirecionamento para página de login SSO validado');
    }

    validarLoginComSucesso() {
      cy.contains('span', 'Aluno: marcos.pereira@afya.com')
        .log('✅ Login via SSO com autenticação bem-sucedida e VPN conectada');
    }

    validarAreaLogada() {
      cy.visit('/profile')
      cy.url().should('eq', 'https://areaaluno.educon-stg.afya.systems/profile');
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
        .type('marcos.perreira@afya.com')
        .wait(2000);

      cy.get(this.inputSenha)
        .should('exist')
        .type('senha123')
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
  