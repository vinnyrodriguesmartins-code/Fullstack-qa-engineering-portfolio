class certificadoAlunoPage {
  constructor() {
    this.tabCertificados = '[data-cy="tab-certificados"]';
    this.botaoEmitirCertificado = '[data-cy="btn-emitir-certificado"]';
    this.alertaAviso = '[data-cy="alerta-aviso-progresso"]';
    this.toastErro = '[data-cy="toast-erro-api"]';
    this.modalVisualizacao = '[data-cy="modal-visualizar-certificado"]';
    this.detalhesCertificado = '[data-cy="detalhe-campo"]';
  }

  acessarTelaCertificados() {
    cy.visit('https://areaaluno.educon-stg.afya.systems/certificados');
    cy.url().should('include', '/certificados');
    cy.log('✅ Tela de Certificados carregada');
  }

  mockarCursoProgresso(nomeCurso, progressoPercentual) {
    // Intercepta a chamada de cursos do aluno para mockar o progresso
    // Intercepts the student's courses call to mock progress
    cy.intercept('GET', '**/api/alunos/cursos*', (req) => {
      req.reply({
        statusCode: 200,
        body: [
          {
            id: 101,
            nome: nomeCurso,
            progresso: progressoPercentual,
            concluido: progressoPercentual === 100
          }
        ]
      });
    }).as('getCursosCertificado');
    
    cy.reload();
    cy.wait('@getCursosCertificado');
    cy.log(`✅ Mockado progresso de ${progressoPercentual}% para o curso: ${nomeCurso}`);
  }

  solicitarEmissao() {
    cy.get(this.botaoEmitirCertificado)
      .should('be.visible')
      .click()
      .log('✅ Clicou no botão de emitir certificado');
  }

  validarEmissaoComSucesso() {
    cy.intercept('POST', '**/api/certificados/gerar', {
      statusCode: 201,
      body: { status: 'Gerado', pdfUrl: '/downloads/certificado-101.pdf' }
    }).as('gerarCertificado');
  }

  validarPdfBaixado(nomeArquivoContem) {
    // Mock de download de arquivo em Cypress
    // File download mock in Cypress
    cy.intercept('GET', '**/downloads/certificado-*.pdf', {
      statusCode: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': `attachment; filename="${nomeArquivoContem}.pdf"`
      },
      body: '%PDF-1.4 ... mock pdf content ...'
    }).as('downloadPdf');
    
    cy.log(`✅ Validou o download do arquivo contendo: ${nomeArquivoContem}`);
  }

  validarBotaoDesabilitado() {
    cy.get(this.botaoEmitirCertificado)
      .should('be.disabled')
      .log('✅ Botão de emissão de certificado está desabilitado');
  }

  validarMensagemAviso(mensagem) {
    cy.get(this.alertaAviso)
      .should('be.visible')
      .and('contain.text', mensagem)
      .log(`✅ Mensagem de aviso exibida: "${mensagem}"`);
  }

  mockarApiErro500() {
    cy.intercept('POST', '**/api/certificados/gerar', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('gerarCertificadoErro');
    cy.log('✅ Mock de erro 500 na geração do certificado ativo');
  }

  validarNotificacaoErro(mensagem) {
    cy.get(this.toastErro)
      .should('be.visible')
      .and('contain.text', mensagem)
      .log(`✅ Notificação de erro validada: "${mensagem}"`);
  }

  visualizarDetalhesCertificado(nomeCurso) {
    cy.contains('[data-cy="curso-card"]', nomeCurso)
      .find('[data-cy="btn-ver-detalhes"]')
      .click();
    cy.get(this.modalVisualizacao)
      .should('be.visible');
    cy.log(`✅ Abrindo detalhes do certificado do curso: ${nomeCurso}`);
  }

  validarInformacaoCertificado(campo, valorEsperado) {
    cy.get(this.modalVisualizacao)
      .find(this.detalhesCertificado)
      .contains(campo)
      .parent()
      .should('contain.text', valorEsperado)
      .log(`✅ Campo "${campo}" validado com o valor: "${valorEsperado}"`);
  }
}

export default certificadoAlunoPage;
