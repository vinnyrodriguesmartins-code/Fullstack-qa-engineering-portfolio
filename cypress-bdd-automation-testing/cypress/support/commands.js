import 'cypress-wait-until';
import 'cypress-iframe';
import 'cypress-drag-drop';
import 'cypress-real-events/support';
import 'cypress-xpath';

const variaveis = require('../fixtures/Configuracoes.js');

// Comando customizado para realizar login via SSO na área do aluno
// Custom command to perform login via SSO in the student portal
Cypress.Commands.add('LoginNovaLLL_Marcos', () => {
  const emailareaaluno = variaveis.LoginNovaLLL_Marcos.email;
  const passwordareaaluno = variaveis.LoginNovaLLL_Marcos.password;
  cy.get('#email').type(emailareaaluno).wait(2000);
  cy.get('#password').type(passwordareaaluno).wait(2000);
  cy.get('.submit-button').click({ force: true }).wait(2000);
});
