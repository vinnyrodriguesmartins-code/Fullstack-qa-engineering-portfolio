import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import meusCursosPage from "../../support/pages/meusCursosPage";

const meusCursos = new meusCursosPage();
    
  Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

// Cenário: Caso 1 - Exibição da lista completa de cursos no drawer
Given('que o usuário acessa aba "Aprender" e possui mais de 4 cursos cadastrados', () => {
    meusCursos.acessarTabAprender();
    meusCursos.clicarBotaoRecarregar();
    meusCursos.visualizarMeusCursos();
});

When('clica em “Ver todos” na seção de cursos', () => {
    meusCursos.clicarBotaoVerTodos();
});

Then('o drawer lateral deve ser exibido com a lista completa de cursos', () => {
    meusCursos.visualizarDrawerMeusCursos();
});

// Cenário: Caso 2 - Filtrar cursos por status e manter divisão por seção
Given('que o drawer com a lista de cursos está aberto', () => {
    meusCursos.acessarTabAprender();
    meusCursos.clicarBotaoRecarregar();
    meusCursos.visualizarMeusCursos();
    meusCursos.clicarBotaoVerTodos();
});

When('o usuário clica no filtro {string}', (nomeFiltro) => {
    meusCursos.clicarFiltros(nomeFiltro);
    meusCursos.clicarBotaoX();
});

Then('a lista deve exibir apenas os cursos que correspondem ao filtro {string} selecionado', (nomeFiltro) => {

});

// Cenário: Caso 3 - Buscar cursos por nome, modalidade ou tag
When('o usuário clica na lupa e digita {string} relacionado ao nome, modalidade ou tag de um curso', (texto) => {
    meusCursos.clicarBotaoPesquisar();
    meusCursos.clicarInputPesquisar(texto);
});

Then('a lista deve ser atualizada com os cursos correspondentes', () => {

});

// Cenário: Caso 4 - Validar busca sem resultados no drawer
When('o usuário clica na lupa e digita "teste"', () => {
    meusCursos.clicarBotaoPesquisar();
    meusCursos.clicarInputInvalido();
});

Then('deve ser exibida a mensagem de que nenhum resultado foi encontrado', () => {
    meusCursos.validarMensagemNenhumResultado();
});

// Cenário: Caso 5 - Validar ação de despriorizar ou destacar curso no drawer
When('o usuário clica no botão "Despriorizar" ou "Destacar"', () => {
    meusCursos.clicarBotaoPesquisar();
    meusCursos.clicarInputPesquisar('Dermatologia');
    cy.wait(3000);
    meusCursos.priorizarCurso();
});

Then('o curso deve ser substituído automaticamente pelo primeiro da lista de "Outros cursos" ou "Em Destaque"', () => {
    meusCursos.validarCursoSubstituido();
});

