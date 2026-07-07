// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const variaveis = require('../fixtures/Configuracoes.js')
import 'cypress-wait-until';
import 'cypress-iframe';
import 'cypress-drag-drop';
import 'cypress-real-events/support';
import 'cypress-xpath';
import 'cypress-real-events/support';

//Logar na Plataforma
Cypress.Commands.add('LoginNovaLLL_Marcos', () => {
  const emailareaaluno = variaveis.LoginNovaLLL_Marcos.email;
  const passwordareaaluno = variaveis.LoginNovaLLL_Marcos.password;
  cy.get('#email').type(emailareaaluno).wait(2000);
  cy.get('#password').type(passwordareaaluno).wait(2000);
  cy.get('.submit-button').click({force: true}).wait(2000);
});
