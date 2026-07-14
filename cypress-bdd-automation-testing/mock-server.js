const http = require('http');
const url = require('url');

const PORT = 3000;

// Servidor HTTP local para simulação do Portal do Aluno (mock-server)
// Local HTTP server to simulate the Student Portal (mock-server)
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Rota de login da API (para simular erros e sucesso)
  if (path === '/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (payload.email === 'usuario-invalido@example.com' || payload.password === 'SenhaIncorreta999') {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Credenciais inválidas' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, token: 'mock-sso-token-xyz' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Bad Request' }));
      }
    });
    return;
  }

  // Rota default de listagem de cursos para o certificado (usado quando acessado fora do Cypress)
  if (path === '/api/alunos/cursos' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 101, nome: 'Desenvolvimento React', progresso: 100, concluido: true, cargaHoraria: '40 horas', dataConclusao: '12/05/2025' },
      { id: 102, nome: 'Automação de Testes QA', progresso: 100, concluido: true, cargaHoraria: '60 horas', dataConclusao: '18/06/2026' },
      { id: 103, nome: 'Desenvolvimento Web Avançado', progresso: 100, concluido: true, cargaHoraria: '40 horas', dataConclusao: '12/05/2025' },
      { id: 104, nome: 'Banco de Dados NoSQL', progresso: 60, concluido: false, cargaHoraria: '30 horas', dataConclusao: '-' }
    ]));
    return;
  }

  // Estilo visual moderno para as páginas de mock
  // Modern visual styling for mock pages
  const htmlTemplate = (title, content) => `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>${title} - Mock Portal</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #f1f5f9;
          margin: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .card {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 100%;
          text-align: center;
        }
        h1 { color: #38bdf8; margin-bottom: 20px; }
        button, .btn {
          background-color: #0284c7;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          text-decoration: none;
          display: inline-block;
          margin: 10px;
        }
        button:hover, .btn:hover { background-color: #0369a1; }
        button:disabled { background-color: #475569; cursor: not-allowed; }
        input {
          width: 90%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 6px;
          border: 1px solid #475569;
          background-color: #1e293b;
          color: white;
        }
        .alert { background-color: #b91c1c; padding: 10px; border-radius: 6px; margin: 10px 0; font-size: 14px; }
        .success-toast { background-color: #15803d; padding: 10px; border-radius: 6px; margin: 10px 0; }
        .course-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 20px; }
        .course-card {
          background: #334155;
          padding: 15px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          margin-bottom: 10px;
        }
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 350px;
          height: 100%;
          background: #1e293b;
          border-left: 2px solid #38bdf8;
          box-shadow: -5px 0 15px rgba(0,0,0,0.5);
          padding: 20px;
          box-sizing: border-box;
          transform: translateX(100%);
          transition: transform 0.3s;
        }
        .drawer.open { transform: translateX(0); }
        .step-option {
          background: #1e293b;
          padding: 10px;
          margin: 5px;
          border-radius: 6px;
          cursor: pointer;
          border: 1px solid #475569;
        }
        .step-option:hover { background: #334155; }
      </style>
    </head>
    <body>
      <div class="card">
        ${content}
      </div>
    </body>
    </html>
  `;

  // --- Rotas HTML ---
  if (path === '/') {
    // Redireciona para o login local conforme o fluxo da aplicação
    res.writeHead(302, { 'Location': '/sign-in' });
    res.end();
  } 
  
  else if (path === '/sign-in') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate('Home', `
      <h1>Bem-vindo à plataforma</h1>
      <p>Simulação local para testes de automação QA.</p>
      <button onclick="window.location.href='/sso-login?client_id=be556401-cf0f-4130-aab7-d20a446f3a76&redirect_uri=/auth/callback'">Entrar com SSO</button>
      <br/><br/>
      <!-- Link para simular acesso à rota protegida 'Dashboard' -->
      <a href="/dashboard" class="btn">Dashboard</a>
    `));
  }

  else if (path === '/dashboard') {
    // Simula redirecionamento por falta de autenticação
    res.writeHead(302, { 'Location': '/sign-in' });
    res.end();
  }
  
  else if (path === '/sso-login') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate('Login SSO', `
      <h1>Login via SSO</h1>
      <form id="loginForm">
        <input type="email" id="email" placeholder="E-mail" required />
        <input type="password" id="password" placeholder="Senha" required />
        <button type="button" class="submit-button" onclick="handleLogin()">Entrar</button>
      </form>
      <div id="errorAlert" class="alert" style="display:none;">Credenciais inválidas</div>
      <script>
        function handleLogin() {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          
          fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          .then(res => {
            if (res.status === 200) {
              const urlParams = new URLSearchParams(window.location.search);
              const state = urlParams.get('state');
              window.location.href = state ? decodeURIComponent(state) : '/profile';
            } else {
              document.getElementById('errorAlert').style.display = 'block';
            }
          });
        }
      </script>
    `));
  } 
  
  else if (path === '/profile') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate('Perfil', `
      <h1>Perfil do Aluno</h1>
      <span>Aluno: marcos.pereira@afya.com</span>
      <br/><br/>
      <a href="/aprender" class="btn" data-cy="tab-link">Aprender</a>
      <a href="/certificados" class="btn">Certificados</a>
      <button data-cy="sign-out-button" onclick="window.location.href='/'">Sair</button>
    `));
  } 
  
  else if (path === '/aprender') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate('Aprender', `
      <h1 data-cy="tab-link">Aprender</h1>
      <button data-cy="button-error-retry-button" onclick="location.reload()">Recarregar</button>
      
      <div class="course-grid" data-cy="courses-grid">
        <div class="course-card" data-cy="course-list-item-course-dermatology">
          <div>
            <strong>Dermatologia Básica</strong>
            <br/>Status: Trial
          </div>
          <button data-cy="button-course-course-sponsored-button-1">Trial</button>
        </div>
      </div>

      <button onclick="document.getElementById('drawer').classList.add('open')">Ver todos</button>

      <!-- Drawer Lateral -->
      <div id="drawer" class="drawer" data-cy="drawer-content">
        <h2 data-cy="headline-title">Meus cursos</h2>
        <button data-cy="drawer-close-button" onclick="closeDrawer()">Fechar</button>
        <button data-cy="drawer-search-button">Buscar</button>
        <input type="text" data-cy="input-search" placeholder="Pesquisar..." oninput="handleSearch(this.value)" />
        
        <!-- Filtros do BDD -->
        <div style="margin: 10px 0;">
          <button onclick="filterCourses('Todos')">Todos</button>
          <button onclick="filterCourses('Destacados')">Destacados</button>
          <button onclick="filterCourses('Em andamento')">Em andamento</button>
          <button onclick="filterCourses('Trial')">Trial</button>
          <button onclick="filterCourses('Não iniciado')">Não iniciado</button>
          <button onclick="filterCourses('Concluídos')">Concluídos</button>
        </div>

        <div id="drawerCourseList" style="margin-top: 15px;">
          <!-- Seção Cursos em Destaque -->
          <div data-cy="course-list-Cursos em destaque" class="course-card">
            <div data-cy="course-list-item-course-dermatology">
              <strong>Dermatologia Clinica (Destaque)</strong>
              <button data-cy="courses-list-item-unpin-button" onclick="unpinCourse()">Despriorizar</button>
            </div>
          </div>
          
          <!-- Seção Outros Cursos -->
          <div data-cy="list-header-label" class="course-card">
            <div data-cy="course-list-item-course-dermatology">
              <strong>Dermatologia Básica (Outro)</strong>
              <button data-cy="courses-list-item-onpin-button" onclick="pinCourse()">Destacar</button>
            </div>
          </div>
        </div>

        <!-- Bubble de Confirmação de Substituição (exibido ao Destacar) -->
        <div id="replaceBubble" style="display:none; background:#334155; padding:10px; border-radius:6px; margin-top:10px;">
          <p>Você precisa substituir um dos cursos abaixo para destacar</p>
          <div data-cy="bubble-pin-course">
            <button onclick="confirmReplace()">Substituir Curso</button>
          </div>
        </div>

        <div id="notFoundMsg" data-cy="not-found-list-item" style="display:none; color:red;">Não encontramos resultados para essa busca</div>
        <img id="notFoundImg" data-cy="not-found-list-item-image" src="" alt="Not Found" style="display:none;" />
      </div>

      <!-- Drawer de Feedback Trial (Modal Multi-etapas) -->
      <div id="trialFeedbackModal" class="drawer" style="display:none;">
        <h2 data-cy="headline-title">Avalie o período de teste</h2>
        
        <!-- Step 1: Notas -->
        <div id="step1">
          <div class="step-option" onclick="selectScore('Excelente')">Excelente</div>
          <div class="step-option" onclick="selectScore('Boa')">Boa</div>
          <div class="step-option" onclick="selectScore('Regular')">Regular</div>
          <div class="step-option" onclick="selectScore('Ruim')">Ruim</div>
          <div class="step-option" onclick="selectScore('Péssima')">Péssima</div>
          <br/>
          <button onclick="goToStep(2)">Próximo</button>
        </div>
        
        <!-- Step 2: Intenção de Compra -->
        <div id="step2" style="display:none;">
          <p>Você tem intenção de adquirir o curso?</p>
          <div class="step-option" onclick="selectIntent('Sim')">Sim</div>
          <div class="step-option" onclick="selectIntent('Talvez')">Talvez</div>
          <div class="step-option" onclick="selectIntent('Não')">Não</div>
          <br/>
          <button onclick="goToStep(1)">Voltar</button>
          <button onclick="goToStep(3)">Próximo</button>
        </div>
        
        <!-- Step 3: Comentário -->
        <div id="step3" style="display:none;">
          <input type="text" data-cy="input-feedback" placeholder="Comentário" />
          <br/>
          <button onclick="goBackFromStep3()">Voltar</button>
          <button onclick="submitFeedback()">Enviar feedback</button>
        </div>

        <div id="toastMsg" class="success-toast" style="display:none;">Obrigado!</div>
        <button id="closeBtn" onclick="closeFeedback()" style="display:none;">Fechar</button>
        <button data-cy="drawer-close-button" onclick="closeFeedback()" style="position:absolute; top:10px; right:10px;">X</button>
      </div>

      <script>
        function closeDrawer() {
          document.getElementById('drawer').classList.remove('open');
        }
        function filterCourses(filter) {
          console.log('Filtrando por:', filter);
        }
        function unpinCourse() {
          document.querySelector('[data-cy="course-list-Cursos em destaque"]').style.display = 'none';
        }
        function pinCourse() {
          document.getElementById('replaceBubble').style.display = 'block';
        }
        function confirmReplace() {
          document.getElementById('replaceBubble').style.display = 'none';
          document.querySelector('[data-cy="list-header-label"]').style.display = 'none';
        }

        function handleSearch(val) {
          if (val === 'testeee') {
            document.getElementById('drawerCourseList').style.display = 'none';
            document.getElementById('notFoundMsg').style.display = 'block';
            document.getElementById('notFoundImg').style.display = 'block';
          } else {
            document.getElementById('drawerCourseList').style.display = 'block';
            document.getElementById('notFoundMsg').style.display = 'none';
            document.getElementById('notFoundImg').style.display = 'none';
          }
        }
        
        // Modal de Feedback Trial
        document.querySelector('[data-cy="button-course-course-sponsored-button-1"]').onclick = () => {
          document.getElementById('trialFeedbackModal').style.display = 'block';
          document.getElementById('trialFeedbackModal').classList.add('open');
        }

        let selectedScore = '';
        let selectedIntent = '';
        
        function selectScore(score) {
          selectedScore = score;
        }
        function selectIntent(intent) {
          selectedIntent = intent;
        }
        function goToStep(step) {
          if (step === 2 && !selectedScore) {
            const toast = document.getElementById('toastMsg');
            toast.innerText = 'Este campo é obrigatório para continuar';
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 2000);
            return;
          }
          
          // Se for nota baixa (Péssima, Ruim, Regular)
          const isLowScore = ['Péssima', 'Ruim', 'Regular'].includes(selectedScore);
          
          let targetStep = step;
          if (isLowScore) {
            if (step === 2) {
              // Pula o step 2 (Intenção de Compra) e vai para o 3 (Comentário)
              targetStep = 3;
            } else if (step === 1) {
              // Ao voltar do step 3, volta direto para o 1
              targetStep = 1;
            }
          }
          
          document.getElementById('step1').style.display = targetStep === 1 ? 'block' : 'none';
          document.getElementById('step2').style.display = targetStep === 2 ? 'block' : 'none';
          document.getElementById('step3').style.display = targetStep === 3 ? 'block' : 'none';
        }
        function goBackFromStep3() {
          const isLowScore = ['Péssima', 'Ruim', 'Regular'].includes(selectedScore);
          goToStep(isLowScore ? 1 : 2);
        }
        function submitFeedback() {
          let msg = 'Obrigado!';
          if (selectedScore === 'Boa' && selectedIntent === 'Sim') {
            msg = 'Agradecemos pela sua confiança!';
          }
          document.getElementById('toastMsg').innerText = msg;
          document.getElementById('toastMsg').style.display = 'block';
          document.getElementById('step3').style.display = 'none';
          document.getElementById('closeBtn').style.display = 'block';
        }
        function closeFeedback() {
          document.getElementById('trialFeedbackModal').style.display = 'none';
          document.getElementById('trialFeedbackModal').classList.remove('open');
          goToStep(1);
          selectedScore = '';
          selectedIntent = '';
          document.getElementById('toastMsg').style.display = 'none';
          document.getElementById('closeBtn').style.display = 'none';
        }
      </script>
    `));
  } 
  
  else if (path.startsWith('/video/') || path.startsWith('/pocVideoChapters/')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate('Video Player', `
      <h1>Reprodutor de Vídeo</h1>
      <!-- Botão para simular login direto na sessão de vídeo -->
      <button onclick="window.location.href='/sso-login?client_id=be556401-cf0f-4130-aab7-d20a446f3a76&redirect_uri=/auth/callback&state=' + encodeURIComponent(window.location.pathname)">Entrar com SSO</button>
      <br/><br/>
      <div style="background:#000; width:100%; height:200px; position:relative; margin-bottom: 10px;" data-cy="media-player-video-content">
        <span style="position:absolute; top:45%; left:30%;">[Reprodutor de Vídeo]</span>
      </div>
      <div>
        <button data-cy="floating-play-state-paused">Pause</button>
        <button data-cy="floating-play-state-playing">Play</button>
        <button data-cy="button-playpause">Play/Pause</button>
        <button data-cy="button-volume-toggle">Mute/Volume</button>
        <button data-cy="action-menu-caption">Legenda</button>
        <button data-cy="switch-undefined-track">Ativar Legenda</button>
        <button data-cy="idioma-da-legenda">Idioma</button>
        <button data-cy="pt-br">PT-BR</button>
        <button data-cy="action-menu-settings" onclick="toggleSettingsMenu()">Configurações</button>
        <div id="settingsMenu" style="display:none; background:#334155; padding:10px; border-radius:6px; margin: 10px 0;">
          <button data-cy="velocidade-da-reprodução" onclick="showSpeedOptions()">Velocidade</button>
          <button data-cy="qualidade" onclick="showQualityOptions()">Qualidade</button>
          
          <div id="speedOptions" style="display:none; margin-top:5px;">
            <button onclick="selectSpeed('2x')">2x</button>
            <button onclick="selectSpeed('1.5x')">1.5x</button>
            <button onclick="selectSpeed('1.25x')">1.25x</button>
            <button onclick="selectSpeed('1x')">1x</button>
            <button onclick="selectSpeed('0.75x')">0.75x</button>
          </div>
          
          <div id="qualityOptions" style="display:none; margin-top:5px;">
            <button onclick="selectQuality('720p')">720p</button>
            <button onclick="selectQuality('480p')">480p</button>
            <button onclick="selectQuality('360p')">360p</button>
            <button onclick="selectQuality('240p')">240p</button>
            <button onclick="selectQuality('Automático')">Automático</button>
          </div>
        </div>
        <button data-cy="button-pip">MiniPlayer</button>
        <button data-cy="button-fullscreen">Tela Cheia</button>
        <button data-cy="button-error-retry-button">Recarregar</button>
        
        <br/><br/>
        <!-- Seção de Capítulos -->
        <button onclick="toggleChapters()">Capítulos</button>
        <div id="chaptersPanel" class="drawer" style="display:none;">
          <h3>Capítulos Disponíveis</h3>
          <div id="chaptersList">
            <p onclick="selectChapter(1)">Capítulo 1</p>
            <p onclick="selectChapter(2)">Capítulo 2</p>
            <p onclick="selectChapter(3)">Capítulo 3</p>
            <p onclick="selectChapter(4)">Capítulo 4</p>
            <p onclick="selectChapter(5)">Capítulo 5</p>
          </div>
          <button data-cy="drawer-close-button" onclick="toggleChapters()">Fechar</button>
          <button onclick="toggleChapters()" aria-label="Fechar painel de capítulos">Fechar Painel</button>
        </div>

        <div data-cy="progress-bar-video-controls-progress" style="width:100%; background:#475569; height:10px;">
          <div data-cy="progress-indicator" style="width:30%; background:#38bdf8; height:100%;"></div>
        </div>
      </div>
      <div id="errorMessage" style="display:none;" class="alert">Não foi possível carregar este vídeo. Por favor, tente novamente.</div>

      <script>
        // Caso acesse url com erro de vídeo (ex: Caso 2)
        if (window.location.href.includes('68307486842907b2634000be')) {
          document.getElementById('errorMessage').style.display = 'block';
        }

        function toggleChapters() {
          const panel = document.getElementById('chaptersPanel');
          panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
          panel.classList.toggle('open');
        }
        function selectChapter(ch) {
          console.log('Selecionado capitulo:', ch);
        }
        function toggleSettingsMenu() {
          const menu = document.getElementById('settingsMenu');
          menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
          document.getElementById('speedOptions').style.display = 'none';
          document.getElementById('qualityOptions').style.display = 'none';
        }
        function showSpeedOptions() {
          document.getElementById('speedOptions').style.display = 'block';
          document.getElementById('qualityOptions').style.display = 'none';
        }
        function showQualityOptions() {
          document.getElementById('qualityOptions').style.display = 'block';
          document.getElementById('speedOptions').style.display = 'none';
        }
        function selectSpeed(speed) {
          console.log('Selected speed:', speed);
          document.getElementById('settingsMenu').style.display = 'none';
        }
        function selectQuality(quality) {
          console.log('Selected quality:', quality);
          document.getElementById('settingsMenu').style.display = 'none';
        }
      </script>
    `));
  } 
  
  else if (path === '/certificados') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate('Certificados', `
      <h1>Meus Certificados</h1>
      
      <div id="cursoList">Carregando...</div>

      <div id="alertaAviso" data-cy="alerta-aviso-progresso" class="alert" style="display:none;">Progresso mínimo necessário: 100%</div>
      <div id="toastErro" data-cy="toast-erro-api" class="alert" style="display:none; background:#b91c1c;">Serviço temporariamente indisponível. Tente novamente mais tarde</div>

      <!-- Modal de Detalhes -->
      <div id="detalhesModal" class="drawer" data-cy="modal-visualizar-certificado">
        <h2>Detalhes do Certificado</h2>
        <div style="margin: 10px 0;">
          <p><strong data-cy="detalhe-campo">Nome do Aluno</strong>: <span>Marcos da Silva</span></p>
          <p><strong data-cy="detalhe-campo">Nome do Curso</strong>: <span id="modalCursoNome">Curso</span></p>
          <p><strong data-cy="detalhe-campo">Carga Horária</strong>: <span id="modalCargaHoraria">40 horas</span></p>
          <p><strong data-cy="detalhe-campo">Data de Conclusão</strong>: <span id="modalDataConclusao">12/05/2025</span></p>
        </div>
        <button onclick="document.getElementById('detalhesModal').style.display='none'">Fechar</button>
      </div>

      <script>
        // Carrega cursos dinamicamente do mock
        fetch('/api/alunos/cursos')
          .then(res => res.json())
          .then(cursos => {
            const list = document.getElementById('cursoList');
            list.innerHTML = '';
            cursos.forEach(curso => {
              const card = document.createElement('div');
              card.className = 'course-card';
              card.setAttribute('data-cy', 'curso-card');
              card.innerHTML = \`
                <div>
                  <strong>\${curso.nome}</strong><br/>
                  Progresso: <span id="progressoVal">\${curso.progresso}%</span>
                </div>
                <button id="emitirBtn" data-cy="btn-emitir-certificado" \${curso.progresso < 100 ? 'disabled' : ''}>Emitir Certificado</button>
                <button data-cy="btn-ver-detalhes" onclick="abrirModal('\${curso.nome}')">Ver Detalhes</button>
              \`;
              list.appendChild(card);
              
              // Ações do botão emitir
              const emitirBtn = card.querySelector('#emitirBtn');
              emitirBtn.onclick = () => {
                if (curso.progresso < 100) {
                  document.getElementById('alertaAviso').style.display = 'block';
                  return;
                }
                
                // Ao clicar, faz POST para gerar certificado
                fetch('/api/certificados/gerar', { method: 'POST', body: JSON.stringify({ cursoId: curso.id }) })
                  .then(res => {
                    if (res.status === 201) {
                      return res.json().then(data => {
                        // Simula o download
                        window.location.href = data.pdfUrl;
                      });
                    } else {
                      document.getElementById('toastErro').style.display = 'block';
                    }
                  });
              };
            });
          });

        function abrirModal(nomeCurso) {
          fetch('/api/alunos/cursos')
            .then(res => res.json())
            .then(cursos => {
              const curso = cursos.find(c => c.nome === nomeCurso);
              if (curso) {
                document.getElementById('modalCursoNome').innerText = curso.nome;
                document.getElementById('modalCargaHoraria').innerText = curso.cargaHoraria || '40 horas';
                document.getElementById('modalDataConclusao').innerText = curso.dataConclusao || '12/05/2025';
              }
              document.getElementById('detalhesModal').style.display = 'block';
              document.getElementById('detalhesModal').classList.add('open');
            });
        }
      </script>
    `));
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate('404 Not Found', '<h1>Página não encontrada</h1>'));
  }
});

server.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
