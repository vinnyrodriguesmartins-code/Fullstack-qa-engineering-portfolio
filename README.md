# ✨ PORTFÓLIO DE PROJETOS — DEVS HUB ✨

Seja bem-vindo(a) ao meu portfólio de engenharia de software! Este repositório unifica projetos reais desenvolvidos com foco em **Arquitetura Limpa**, **Segurança**, **Qualidade de Software** e **Testes Automatizados (E2E & Unitários)**.

---

## 🚀 Tecnologias em Destaque

![.NET 9](https://img.shields.io/badge/.NET%209-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 📂 Projetos no Repositório

| Projeto | Descrição | Stack Principal | Destaques Técnicos | Link de Acesso |
| :--- | :--- | :--- | :--- | :---: |
| **Minhas Finanças** | Sistema completo para controle de despesas e receitas domésticas. | .NET 9, React, Vite, Tailwind CSS, EF Core, SQLite | Clean Architecture, Injeção de Dependências, Testes unitários/integração (xUnit), Testes E2E (Playwright), Docker Compose | [Acessar Projeto](file:///c:/Projetos/Trampo%20teste/minhas-financas) |
| **Educon Test Automation** | Suíte corporativa de testes automatizados E2E para o portal do aluno. | Cypress, Cucumber (BDD), JavaScript, Allure Reports, Husky | Login via SSO, Injeção de variáveis de ambiente seguras, Relatórios visuais avançados, Execução paralela | [Acessar Projeto](file:///c:/Projetos/Trampo%20teste/educon-test-automation) |

---

## 🏛️ Estrutura Organizada do Repositório

Esta é a estrutura de diretórios unificada e limpa que organiza todos os projetos sem redundâncias ou arquivos residuais de compilação:

```text
c:/Projetos/Trampo teste/
├── minhas-financas/              # Sistema de Controle de Gastos Residenciais
│   ├── api/                      # Backend .NET 9 Web API
│   │   ├── MinhasFinancas.API/          # Camada de apresentação e controladores
│   │   ├── MinhasFinancas.Application/  # Regras de aplicação (Usecases, DTOs)
│   │   ├── MinhasFinancas.Domain/       # Core de negócios (Entidades puras, Interfaces)
│   │   └── MinhasFinancas.Infrastructure/ # Banco e Acesso a dados (EF Core)
│   ├── web/                      # Frontend SPA React 19 + Vite (Interface do Usuário)
│   ├── data/                     # Pasta do SQLite Local (minhasfinancas.db)
│   ├── tests/                    # Suíte unificada de Garantia de Qualidade (QA)
│   │   ├── backend/              # Testes do C# (Unitários e de Integração com xUnit)
│   │   └── frontend/             # Testes do React (Vitest e E2E Playwright)
│   └── docker-compose.yml        # Orquestrador local da API + Web em containers
│
└── educon-test-automation/       # Automação Cypress para Área do Aluno (Afya Educon)
    ├── cypress/                  # Testes BDD (.feature), Definição de passos (Steps) e Page Objects
    │   ├── e2e/                  # Funcionalidades e fluxos simulados
    │   └── support/              # Comandos customizados Cypress e configurações
    ├── package.json              # Dependências e scripts de teste
    └── cypress.env.example.json  # Modelo para configuração das credenciais SSO
```

---

## 🔒 Segurança e Privacidade de Dados

Este repositório foi configurado seguindo as melhores práticas de **Segurança de Informação (DevSecOps)** para evitar o vazamento de segredos corporativos ou dados de produção:

> [!IMPORTANT]
> - **Credenciais Cypress Protegidas**: O arquivo `cypress.env.json` com senhas reais e tokens da API foi removido do rastreamento do Git e adicionado ao `.gitignore` global. Em seu lugar, foi disponibilizado o template [cypress.env.example.json](file:///c:/Projetos/Trampo%20teste/educon-test-automation/cypress.env.example.json) para que novos desenvolvedores possam preencher suas próprias credenciais locais de teste.
> - **Bancos de Dados SQLite Locais Omitidos**: Os arquivos `.db` gerados em tempo de execução foram removidos do histórico de rastreamento do Git, permitindo que a aplicação gere novas bases limpas na inicialização local, sem poluir o histórico ou vazar dados residuais.
> - **Exclusão de Relatórios Temporários**: Pastas como `allure-results/`, `allure-report/`, `cypress/screenshots/` e `cypress/videos/` são dinamicamente ignoradas para manter o repositório leve.

---

## 🛠️ Como Iniciar Localmente

### 1. Clonar e Inicializar o Repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd Trampo-teste
```

### 2. Rodar Minhas Finanças (API + Web)
O projeto está Dockerizado, bastando rodar:
```bash
cd minhas-financas
docker-compose up --build
```
- **API Swagger**: http://localhost:5000/swagger
- **Frontend SPA**: http://localhost:5173

### 3. Rodar Testes de Automação do Aluno (Cypress)
Instale as dependências e configure o ambiente:
```bash
cd educon-test-automation
npm install

# Crie seu arquivo de credenciais a partir do modelo
cp cypress.env.example.json cypress.env.json
# Preencha suas credenciais reais no cypress.env.json

# Para abrir o Cypress Test Runner interativo:
npm run test
```

---

*Desenvolvido com excelência técnica para fins de portfólio de engenharia. Dúvidas ou sugestões, sinta-se à vontade para abrir uma issue!*
