// Ponto de entrada principal do frontend React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryProvider } from './providers/ReactQueryProvider'
import './index.css'
import './App.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/organisms/ErrorBoundary'

// Inicializa a aplicação na div #root do index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Gerenciador de requisições HTTP e cache de estado remoto */}
    <ReactQueryProvider>
      {/* Captura erros não tratados no frontend para evitar que a tela quebre por inteiro */}
      <ErrorBoundary>
        {/* Roteador da aplicação */}
        <BrowserRouter>
          <App />
          {/* Componente global para alertas visuais (toasts) */}
          <Toaster position="top-right" />
        </BrowserRouter>
      </ErrorBoundary>
    </ReactQueryProvider>
  </StrictMode>,
)

