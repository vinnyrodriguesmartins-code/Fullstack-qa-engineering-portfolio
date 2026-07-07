import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import feedbackTrialPage from "../../support/pages/feedbackTrialPage";

const feedbackTrial = new feedbackTrialPage();
    
  Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

// Cenário: Caso 1 - Exibir formulário de avaliação no período de trial
Given('que o usuário acessa a aba Aprender', () => {
    feedbackTrial.acessarTabAprender();
    feedbackTrial.clicarBotaoRecarregar();
});

When('o usuário clica no botão "Trial"', () => {
    feedbackTrial.clicarBotaoTrialFeedback();
});

Then('deve ser exibido o formulário de avaliação', () => {
    feedbackTrial.acessarAvaliacao();
});

 // Cenário: Caso 2 - Avaliar "<nota>" e comentário
Given('que o usuário acessa a avaliação de trial', () => {
    feedbackTrial.acessarTabAprender();
    feedbackTrial.clicarBotaoRecarregar();
    feedbackTrial.clicarBotaoTrialFeedback();
    feedbackTrial.acessarAvaliacao();
});

When('o usuário seleciona a {string}, {string} e adiciona seu comentário',
  (nota, intencaoCompra) => {
    feedbackTrial.avaliarNota(nota);
    feedbackTrial.clicarBotaoProximo();
    feedbackTrial.clicarBotaoVoltar();
    feedbackTrial.clicarBotaoProximo();

    if (intencaoCompra && intencaoCompra.trim() !== '') {
      feedbackTrial.adquirirCurso(intencaoCompra);
      feedbackTrial.clicarBotaoProximo();
    }

    feedbackTrial.preencherComentario(`Comentário via automação - Nota: ${nota}`);
  }
);

Then('o sistema deve exibir {string} de sucesso', (mensagem) => {
    feedbackTrial.clicarBotaoEnviarFeedback();
    feedbackTrial.validarToast(mensagem);
    feedbackTrial.clicarBotaoFechar();
});

// Cenário: Caso 3 - Exibir mensagem de erro ao tentar avançar sem preencher os campos
When('o usuário clica no botão "Próximo" sem preencher os campos', () => {
    feedbackTrial.clicarBotaoProximo();
});

Then('deve ser exibida uma mensagem de alerta sobre o preenchimento obrigatório', () => {
    feedbackTrial.validarToast('Este campo é obrigatório para continuar');
    feedbackTrial.clicarBotaoX();
});