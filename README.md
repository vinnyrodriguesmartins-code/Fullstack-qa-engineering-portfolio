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

## 📐 Arquitetura dos Projetos

### 1. Minhas Finanças (Clean Architecture)

O design do backend segue os princípios da **Arquitetura Limpa (Clean Architecture)**, isolando as regras de negócios centrais (Domínio) dos detalhes de infraestrutura (Banco de dados) e apresentação (API REST). As dependências apontam sempre de fora para dentro.

```mermaid
graph TD
    classDef default fill:#1f2937,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef domain fill:#065f46,stroke:#047857,stroke-width:2px,color:#ecfdf5;
    classDef app fill:#1e3a8a,stroke:#1d4ed8,stroke-width:2px,color:#dbeafe;
    classDef infra fill:#78350f,stroke:#b45309,stroke-width:2px,color:#fef3c7;
    classDef presentation fill:#581c87,stroke:#7e22ce,stroke-width:2px,color:#f3e8ff;

    subgraph "Minhas Finanças — Arquitetura Limpa"
        Web[React SPA Frontend] <--> API[MinhasFinancas.API - Presenter]
        
        API --> App[MinhasFinancas.Application - Regras de Aplicação]
        App --> Domain[MinhasFinancas.Domain - Core de Domínio]
        
        Infra[MinhasFinancas.Infrastructure - Acesso a Dados] --> EF[EF Core & SQLite Database]
        
        %% Dependency Inversion
        Infra -.->|Implementa Interfaces| Domain
        App -.->|Usa Interfaces| Domain
    end

    class Domain domain;
    class App app;
    class Infra,EF infra;
    class Web,API presentation;
```

### 2. Educon Test Automation (POM + BDD)

A suíte de testes do Cypress foi arquitetada utilizando o **Page Object Model (POM)** acoplado com **Cucumber (BDD)**. Isso separa a escrita de cenários de negócios em linguagem natural (Gherkin) dos scripts de interação e assertions da página.

```mermaid
graph LR
    classDef default fill:#1f2937,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef bdd fill:#065f46,stroke:#047857,stroke-width:2px,color:#ecfdf5;
    classDef code fill:#1e3a8a,stroke:#1d4ed8,stroke-width:2px,color:#dbeafe;
    classDef engine fill:#581c87,stroke:#7e22ce,stroke-width:2px,color:#f3e8ff;
    classDef output fill:#78350f,stroke:#b45309,stroke-width:2px,color:#fef3c7;

    subgraph "Educon Test Automation — BDD & POM"
        Feature["Especificações BDD (.feature)"] --> Steps["Definição de Passos (Step Definitions)"]
        Steps --> Pages["Páginas Encapsuladas (Page Objects)"]
        Pages --> Cypress["Cypress Test Engine"]
        Cypress --> SSO["Autenticação via SSO (Staging)"]
        Cypress --> Report["Relatório Allure (HTML Report)"]
    end

    class Feature bdd;
    class Steps,Pages code;
    class Cypress,SSO engine;
    class Report output;
```

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

## 🔒 Segurança e Privacidade de Dados (DevSecOps)

Este repositório foi estruturado seguindo rigorosas práticas de segurança da informação para blindar dados corporativos e credenciais confidenciais:

| Recurso Sensível | Localização Original | Status no Git | Estratégia de Segurança |
| :--- | :--- | :--- | :--- |
| **Credenciais de Acesso** | `educon-test-automation/cypress.env.json` | 🚫 **Ignorado** | Excluído do controle de versão. Disponibilizado o template genérico [cypress.env.example.json](file:///c:/Projetos/Trampo%20teste/educon-test-automation/cypress.env.example.json) para preenchimento individual local. |
| **Banco de Dados Local** | `minhas-financas/api/MinhasFinancas.API/*.db`<br>`minhas-financas/data/*.db` | 🚫 **Ignorado** | Arquivos SQLite removidos do rastreamento para evitar vazamento de dados de simulações. A aplicação gera bases de dados zeradas na primeira execução. |
| **Relatórios e Mídias** | `educon-test-automation/allure-results/`<br>`educon-test-automation/allure-report/`<br>`cypress/screenshots/`<br>`cypress/videos/` | 🚫 **Ignorado** | Relatórios locais e mídias de falha de teste são ignorados para manter a árvore do repositório leve e sem arquivos gerados dinamicamente. |
| **Variáveis de Ambiente** | `.env`, `.env.local` | 🚫 **Ignorado** | Arquivos de ambiente locais do React/Node.js são excluídos de commits de forma global. |

---

## 🛠️ Como Iniciar Localmente

### Guia Rápido de Execução

| Objetivo | Diretório de Trabalho | Comando | Descrição / Resultado |
| :--- | :--- | :--- | :--- |
| **Rodar Aplicação Finanças** | `minhas-financas/` | `docker-compose up --build` | Executa o backend (.NET) e frontend (React) em containers. |
| **Acessar API Swagger** | — | — | Acesse `http://localhost:5000/swagger` no navegador com a API rodando. |
| **Acessar Frontend Web** | — | — | Acesse `http://localhost:5173` no navegador. |
| **Instalar Cypress** | `educon-test-automation/` | `npm install` | Instala as dependências necessárias para a suíte de testes de QA. |
| **Configurar Segredos** | `educon-test-automation/` | `cp cypress.env.example.json cypress.env.json` | Cria o arquivo de credenciais local (preencha-o antes de rodar os testes). |
| **Executar Testes Cypress** | `educon-test-automation/` | `npm run test` | Abre o Cypress Test Runner interativo para execução dos cenários. |
| **Restauração do Backend C#** | `minhas-financas/tests/backend/` | `dotnet restore MinhasFinancas.Tests.sln` | Restaura dependências NuGet do backend de testes. |
| **Rodar Testes de Unidade C#** | `minhas-financas/tests/backend/` | `dotnet test MinhasFinancas.UnitTests/MinhasFinancas.UnitTests.csproj` | Roda os testes unitários do backend .NET. |

---

*Desenvolvido com excelência técnica para fins de portfólio de engenharia. Dúvidas ou sugestões, sinta-se à vontade para abrir uma issue!*
