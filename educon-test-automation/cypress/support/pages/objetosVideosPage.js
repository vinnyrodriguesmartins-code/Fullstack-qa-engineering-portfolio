class objetosVideosPage {
  
    constructor() {

      this.botaoFecharCapitulo = 'button[aria-label="Fechar painel de capítulos"]'
      this.video = '[data-cy="media-player-video-content"]'
      this.botaoPause = '[data-cy="floating-play-state-paused"]'
      this.botaoPlay = '[data-cy="floating-play-state-playing"]'
      this.botaoPlayPause = '[data-cy="button-playpause"]'
      this.botaoVolume = '[data-cy="button-volume-toggle"]'
      this.botaoLegenda = '[data-cy="action-menu-caption"]'
      this.botaoAtivarLegenda = '[data-cy="switch-undefined-track"]'
      this.botaoIdiomaLegenda = '[data-cy="idioma-da-legenda"]'
      this.botaoIdiomaPt = '[data-cy="pt-br"]'
      this.botaoConfiguracoes = '[data-cy="action-menu-settings"]'
      this.botaoVelocidadeReproducao = '[data-cy="velocidade-da-reprodução"]'
      this.botaoQualidadeReproducao = '[data-cy="qualidade"]'
      this.boatoMiniPlayer = '[data-cy="button-pip"]'
      this.botaoFullscreen = '[data-cy="button-fullscreen"]'
      this.botaoBarradeProgresso = '[data-cy="progress-bar-video-controls-progress"]'
      this.botaoIndicadorProgresso = '[data-cy="progress-indicator"]'
      this.botaoRecarregar = '[data-cy="button-error-retry-button"]'
    }

    acessarVideo() {
      cy.visit('https://areaaluno.educon-stg.afya.systems/video/65098424deccdb00080f04a1')
    }

    logarComSSO() {
      cy.contains('button', 'Entrar com SSO')
        .should('be.visible')
      .click({ force: true })
    }

    clicarPlayVideo() {
      cy.get(this.botaoPlay)
        .should('be.visible')
        .click({ force: true })
        .wait(500)
        .log('✅ Vídeo iniciado');
    }

    clicarPauseVideo() {
      cy.get(this.botaoPause)
        .should('be.visible')
        .click({ force: true })
        .wait(500)
        .log('✅ Vídeo Pausado');
    }

    clicarPlayPauseVideo() {
      cy.get(this.botaoPlayPause)
        .should('be.visible')
        .click({ force: true })
        .wait(500)
        .log('✅ Vídeo Play e Pause');
    }

    clicarVolumeVideo() {
      cy.get(this.botaoVolume)
        .should('be.visible')
        .click()
        .wait(500)
        .log('✅ Volume do Vídeo alterado');
    }

    clicarLegendaVideo() {
      cy.get(this.botaoLegenda)
        .should('be.visible')
        .click({ force: true })
        .wait(500)
        .log('✅ Acessado funcionalidade Legenda');
    
      cy.get(this.botaoAtivarLegenda)
        .should('be.visible')
        .click({ force: true })
        .wait(500)
        .log('✅ Legenda Ativada');
    }

    clicarIdiomaLegendaVideo(){
      cy.get(this.botaoIdiomaLegenda)
        .should('be.visible')
       .click({ force: true })
        .wait(500)
        .log('✅ Acessado funcionalidade Idioma');
    
      cy.get(this.botaoIdiomaPt)
        .should('be.visible')
        .click({ force: true })
        .wait(500)
        .log('✅ Idioma Portugues Ativado');
    }

    clicarVelocidadeReproducao(index = 0) {
      const velocidades = ['2x', '1.5x', '1.25x', '1x', '0.75x'];

      if (index >= velocidades.length) return;

      const velocidade = velocidades[index];

      cy.get(this.botaoConfiguracoes)
        .should('be.exist')
        .click({ force: true})

      cy.get(this.botaoVelocidadeReproducao)
        .should('be.visible')
        .click({ force: true })

      cy.contains(velocidade)
        .should('be.visible')
        .click({ force: true })
        .log(`✅ Velocidade selecionada: ${velocidade}`)

        .then(() => {
          this.clicarVelocidadeReproducao(index + 1);
        });
    }

    clicarQualidadeReproducao(index = 0) {
      const qualidades = ['720p', '480p', '360p', '240p', 'Automático'];

      if (index >= qualidades.length) return;

      const qualidade = qualidades[index];

      cy.get(this.botaoConfiguracoes)
        .should('exist')
        .click({ force: true });

      cy.get(this.botaoQualidadeReproducao)
        .should('be.visible')
        .click({ force: true });

      cy.contains(qualidade)
        .should('be.visible')
        .click({ force: true })
        .log(`✅ Qualidade selecionada: ${qualidade}`)

        .then(() => {
          this.clicarQualidadeReproducao(index + 1);
        });
    }
    
    clicarMiniPlayer() {
      cy.get(this.boatoMiniPlayer)
        .should('be.exist')
        .click({ force: true })
        .wait(500)
        .log('✅ Mini Player Ativado');
    }

    clicarFullScreen() {
      cy.get(this.botaoFullscreen)
        .should('be.exist')
        .click({ force: true })
        .wait(500)
        .log('✅ Full Ativado');

      cy.get('body').type('{esc}')
        .wait(500)

      cy.get(this.botaoFullscreen)
        .should('be.exist')
        .click({ force: true })
        .wait(500)
        .log('✅ Full Desativado');
    }

    clicarBarraProgresso(){
      cy.get(this.botaoBarradeProgresso)
        .should('be.exist')
        .click({ force: true })
        .wait(500)
        .log('✅ Barra de Progresso');

      cy.get(this.botaoIndicadorProgresso)
        .should('be.visible')
        .wait(500)
        .log('✅ Barra de Progresso Consumido');
    }

    acessarVideoInvalido(){
      cy.visit('https://areaaluno.educon-stg.afya.systems/video/68307486842907b2634000be')
    }

    validaMensagemErro(){
      cy.contains('div','Não foi possível carregar este vídeo. Por favor, tente novamente.')
      cy.get(this.botaoRecarregar)
      .should('be.visible')
      .click({ force: true })
      .wait(500)
      .log('✅ Url Video Inválido');
    }

    acessarCapitulosVideos() {
      cy.visit('https://areaaluno.educon-stg.afya.systems/pocVideoChapters/5b7431cc7b9d2b6a6d9e9410')
    }

    clicarBotaoCapitulos() {
      cy.contains('button', 'Capítulos')
        .should('be.visible')
        .click()
        .log('✅ Botão "Capítulos" clicado');
    }

    navegarCapitulos() {
    for (let i = 1; i <= 5; i++) {

      cy.contains('p', `Capítulo ${i}`)
        .should('be.visible')
        .click()
        .log(`✅ Capítulo ${i} clicado`);

      cy.wait(2000); 
    }
      cy.log('✅ Navegação pelos capítulos concluída');
    }

    clicarBotaoFecharCapitulo() {
      cy.get(this.botaoFecharCapitulo) // Seleciona o botão de fechar capítulo
      .should('be.visible')
      .click()
      .log('✅ Botão de fechar clicado');
    }
}
  export default objetosVideosPage;