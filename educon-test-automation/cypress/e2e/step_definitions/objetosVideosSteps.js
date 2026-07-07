import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import objetosVideosPage from "../../support/pages/objetosVideosPage";

const objetosVideos = new objetosVideosPage();

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

// Cenário: Caso 1 - Funcionalidades do player de vídeo
Given('que o usuário está logado no sistema na sessão vídeos', () => {
    objetosVideos.acessarVideo();
    objetosVideos.logarComSSO();
    cy.LoginNovaLLL_Marcos();
});

When('o usuário inicia a reprodução de um vídeo', () => {
    objetosVideos.clicarPauseVideo();
});

Then('as funcionalidades devem ser visíveis e funcionais', () => {
    objetosVideos.clicarVolumeVideo();
    objetosVideos.clicarPlayVideo();
    objetosVideos.clicarVolumeVideo();
    objetosVideos.clicarLegendaVideo();
    objetosVideos.clicarIdiomaLegendaVideo();
    objetosVideos.clicarMiniPlayer();
    objetosVideos.clicarBarraProgresso();
    objetosVideos.clicarPlayPauseVideo();
    objetosVideos.clicarVelocidadeReproducao();
    objetosVideos.clicarQualidadeReproducao();
    objetosVideos.clicarFullScreen();
  });

// Cenário: Caso 2 - Apresentar feedback de erro ao acessar URL inválida
When('o usuário acessa uma URL de video inválida', () => {
    objetosVideos.acessarVideoInvalido();
});

Then('o sistema deve apresentar uma mensagem clara de erro ao aluno', () => {
    objetosVideos.validaMensagemErro();
});

// Cenário: Caso 3 - Exibição do vídeo por capítulos
Given('que o usuário acessa página de vídeo por capitulos', () => {
    objetosVideos.acessarCapitulosVideos();
    objetosVideos.logarComSSO();
    cy.LoginNovaLLL_Marcos();
});

When('o usuário clica no botão "Capítulos" e os capítulos disponíveis devem ser exibidos', () => {
    objetosVideos.clicarBotaoCapitulos()
});

Then('o vídeo deve permitir a navegação ao clicar em cada capítulo', () => {
    objetosVideos.navegarCapitulos();
    objetosVideos.clicarBotaoFecharCapitulo();
});