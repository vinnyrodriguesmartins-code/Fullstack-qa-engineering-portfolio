import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import autenticacaoSSOPage from "../../support/pages/autenticacaoSSOPage";

const autenticacaoSSO = new autenticacaoSSOPage();

Before(() => {
  cy.visit('/');
});

   Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

// Cenário: Caso 1 - Redirecionamento para página de login SSO
Given('que o usuário está na página inicial do sistema', () => {
    autenticacaoSSO.acessarPaginaInicial();
});

When('o usuário clica no botão "Entrar com SSO"', () => {
    autenticacaoSSO.clicarBotaoEntrarComSSO();
});

Then('o sistema deve redirecioná-lo para a página de login SSO', () => {
    autenticacaoSSO.validarRedirecionamentoParaLoginSSO();
});

// Cenário: Caso 2 - Login via SSO com autenticação bem-sucedida e VPN conectada
Given('que o usuário está na página inicial de login e está conectado à VPN', () => {
    autenticacaoSSO.clicarBotaoEntrarComSSO();
});

When('o usuário preencher os campos de email e senha e clica no botão "Entrar"', () => {
    cy.LoginNovaLLL_Marcos(); // função customizada para login válido
});

Then('o sistema deve exibir a área logada', () => {
    autenticacaoSSO.validarLoginComSucesso();
    autenticacaoSSO.validarAreaLogada();
});

// Cenário: Caso 3 - Login via SSO com credenciais inválidas
Given('que o usuário está na página de login do SSO', () => {
  autenticacaoSSO.clicarBotaoEntrarComSSO();
  autenticacaoSSO.validarRedirecionamentoParaLoginSSO();
});

When('o usuário preenche os campos de email e senha com credenciais inválidas e clica no botão "Entrar"', () => {
    autenticacaoSSO.interceptarRequisicaoLogin();
    autenticacaoSSO.preencherLoginComCredenciaisInvalidas();
});

Then('o sistema deve exibir a mensagem de erro "Unauthorized"', () => {
    autenticacaoSSO.validarLoginComCredenciaisInvalidas();
});

// Cenário: Caso 4 - Redirecionamento ao acessar rota protegida sem autenticação
Given('que o usuário está na página inicial da Afya', () => {
    autenticacaoSSO.acessarPaginaInicial();
});

When('o usuário clica no link "Dashboard"', () => {
    autenticacaoSSO.acessarRotaProtegida();
});

Then('o sistema deve redirecionar para o login SSO ao tentar acessar rota privada sem autenticação', () => {
    autenticacaoSSO.validarRedirecionamentoAoAcessarRotaProtegida();
});

// Cenário: Caso 5 - Logout e redirecionamento para a página inicial
Given('que o usuário está logado no sistema', () => {
    autenticacaoSSO.clicarBotaoEntrarComSSO();
    cy.LoginNovaLLL_Marcos();
    autenticacaoSSO.validarAreaLogada();
});

When('o usuário clica no botão "Sair"', () => {
    autenticacaoSSO.clicarBotaoSair();
});

Then('o sistema deve deslogar o usuário e redirecionar para a página inicial', () => {
    autenticacaoSSO.acessarPaginaInicial();
});