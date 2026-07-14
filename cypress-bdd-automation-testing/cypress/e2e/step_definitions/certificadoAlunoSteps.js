import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import certificadoAlunoPage from "../../support/pages/certificadoAlunoPage";

const certificadoPage = new certificadoAlunoPage();

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Given('que o aluno está autenticado e na tela de certificados', () => {
  // Utiliza comando customizado ou simula bypass de login SSO
  cy.LoginNovaLLL_Marcos();
  certificadoPage.acessarTelaCertificados();
});

Given('que o aluno concluiu o curso {string} com 100% de progresso', (nomeCurso) => {
  certificadoPage.mockarCursoProgresso(nomeCurso, 100);
});

When('o aluno solicita a emissão do certificado', () => {
  certificadoPage.solicitarEmissao();
});

Then('o certificado deve ser gerado com sucesso', () => {
  certificadoPage.validarEmissaoComSucesso();
});

Then('o arquivo PDF deve ser baixado com o nome contendo {string}', (nomeArquivo) => {
  certificadoPage.validarPdfBaixado(nomeArquivo);
});

Given('que o aluno está cursando {string} com apenas {int}% de progresso', (nomeCurso, progresso) => {
  certificadoPage.mockarCursoProgresso(nomeCurso, progresso);
});

When('o aluno tenta gerar o certificado para este curso', () => {
  // Reutiliza o método de clique, simulando a tentativa
  certificadoPage.solicitarEmissao();
});

Then('o botão de emissão deve estar desabilitado', () => {
  certificadoPage.validarBotaoDesabilitado();
});

Then('o sistema deve exibir a mensagem de aviso {string}', (mensagem) => {
  certificadoPage.validarMensagemAviso(mensagem);
});

Given('que o aluno concluiu o curso {string}', (nomeCurso) => {
  certificadoPage.mockarCursoProgresso(nomeCurso, 100);
});

Given('a API de emissão de certificados está instável e retorna erro 500', () => {
  certificadoPage.mockarApiErro500();
});

Then('o sistema deve exibir uma notificação de erro informando {string}', (mensagem) => {
  certificadoPage.validarNotificacaoErro(mensagem);
});

Given('que o aluno seleciona para visualizar os detalhes do certificado do curso {string}', (nomeCurso) => {
  certificadoPage.mockarCursoProgresso(nomeCurso, 100);
  certificadoPage.visualizarDetalhesCertificado(nomeCurso);
});

When('a tela de visualização do certificado é carregada', () => {
  // Já validado na visualização, apenas garante o log
  cy.log('Visualização do certificado carregada na tela');
});

Then('os campos de identificação devem exibir os dados corretos:', (dataTable) => {
  const hashes = dataTable.hashes(); // Obtém os registros do DataTable
  hashes.forEach((row) => {
    certificadoPage.validarInformacaoCertificado(row.Campo, row.ValorEsperado);
  });
});
