# ✨ PORTFÓLIO DE PROJETOS — DEVS HUB ✨

Seja bem-vindo(a) ao meu portfólio de engenharia de software! Este repositório unifica projetos reais desenvolvidos com foco em **Arquitetura Limpa**, **Segurança**, **Qualidade de Software**, **Testes Automatizados (E2E & Unitários)**, **Testes de Performance** e **Práticas Modernas de DevSecOps/CI/CD**.

---

## 🚀 Tecnologias em Destaque

![.NET 9](https://img.shields.io/badge/.NET%209-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![k6](https://img.shields.io/badge/k6-7F6BE3?style=for-the-badge&logo=k6&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 📂 Projetos no Repositório

| Projeto | Descrição | Stack Principal | Destaques Técnicos | Link de Acesso |
| :--- | :--- | :--- | :--- | :---: |
| **Finances App (Clean Arch)** | Sistema completo para controle de despesas e receitas domésticas com foco em segurança OWASP. | .NET 9, React, Vite, Tailwind CSS, EF Core, SQLite | Clean Architecture, Injeção de Dependências, Testes unitários/integração (xUnit), Testes E2E (Playwright), Docker Compose | [Acessar Projeto](file:///c:/Projetos/Trampo%20teste/finances-app-clean-arch) |
| **Cypress BDD Automation Testing** | Suíte corporativa de testes automatizados E2E para o portal do aluno. | Cypress, Cucumber (BDD), JavaScript, Allure Reports, Husky | Login via SSO, Injeção de variáveis de ambiente seguras, Relatórios visuais avançados, Execução paralela | [Acessar Projeto](file:///c:/Projetos/Trampo%20teste/cypress-bdd-automation-testing) |
| **k6 Performance Testing** | Simulação de carga e estresse automatizados contra a API REST para validação de latência. | JavaScript (ES6), Grafana k6 | Ramping de usuários virtuais concorrentes, Definição de thresholds de SLA, Monitoramento de latência e taxa de erro | [Acessar Projeto](file:///c:/Projetos/Trampo%20teste/k6-performance-testing) |

---

## 📐 Arquitetura dos Projetos

### 1. Finances App (Clean Architecture)

O design do backend segue os princípios da **Arquitetura Limpa (Clean Architecture)**, isolando as regras de negócios centrais (Domínio) dos detalhes de infraestrutura (Banco de dados) e apresentação (API REST).

```mermaid
graph TD
    classDef default fill:#1f2937,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef domain fill:#065f46,stroke:#047857,stroke-width:2px,color:#ecfdf5;
    classDef app fill:#1e3a8a,stroke:#1d4ed8,stroke-width:2px,color:#dbeafe;
    classDef infra fill:#78350f,stroke:#b45309,stroke-width:2px,color:#fef3c7;
    classDef presentation fill:#581c87,stroke:#7e22ce,stroke-width:2px,color:#f3e8ff;

    subgraph "finances-app-clean-arch — Arquitetura Limpa"
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

### 2. Cypress BDD Automation Testing (POM + BDD)

A suíte de testes do Cypress foi arquitetada utilizando o **Page Object Model (POM)** acoplado com **Cucumber (BDD)** para separar cenários de negócios em linguagem natural dos scripts de assertions.

```mermaid
graph LR
    classDef default fill:#1f2937,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef bdd fill:#065f46,stroke:#047857,stroke-width:2px,color:#ecfdf5;
    classDef code fill:#1e3a8a,stroke:#1d4ed8,stroke-width:2px,color:#dbeafe;
    classDef engine fill:#581c87,stroke:#7e22ce,stroke-width:2px,color:#f3e8ff;
    classDef output fill:#78350f,stroke:#b45309,stroke-width:2px,color:#fef3c7;

    subgraph "cypress-bdd-automation-testing — BDD & POM"
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

### 3. Fluxo DevOps & Nuvem (CI/CD Azure DevOps + IaC)

O ecossistema DevOps é orquestrado de forma moderna utilizando pipeline automatizado no Azure Pipelines com provisionamento via código (IaC) com arquivos Bicep:

```mermaid
graph LR
    classDef default fill:#1f2937,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef pipeline fill:#1e3a8a,stroke:#1d4ed8,stroke-width:2px,color:#dbeafe;
    classDef iac fill:#78350f,stroke:#b45309,stroke-width:2px,color:#fef3c7;
    classDef cloud fill:#0369a1,stroke:#0284c7,stroke-width:2px,color:#e0f2fe;

    subgraph "Fluxo DevOps e Cloud Azure"
        Push[Git Push / PR] --> AzPipelines["Azure Pipelines (azure-pipelines.yml)"]
        AzPipelines --> BuildDotnet["Build & Test Backend (.NET)"]
        AzPipelines --> BuildReact["Build Frontend (React SPA)"]
        
        Bicep["IaC Azure Bicep (main.bicep)"] --> DeployApp["Provisionar Recursos (CLI/Portal)"]
        
        BuildDotnet --> Deploy["Deploy Automático"]
        BuildReact --> Deploy
        DeployApp --> AzureWebApp["Azure App Service (Linux Web App)"]
        Deploy --> AzureWebApp
    end

    class AzPipelines,BuildDotnet,BuildReact,Deploy pipeline;
    class Bicep,DeployApp iac;
    class AzureWebApp cloud;
```

---

## 🏛️ Estrutura Organizada do Repositório

Esta é a estrutura de diretórios unificada e limpa que organiza todos os projetos sem redundâncias ou arquivos residuais de compilação:

```text
c:/Projetos/Trampo teste/
├── azure-pipelines.yml           # CI/CD Pipeline do Azure DevOps (YAML)
├── finances-app-clean-arch/      # Sistema de Controle de Gastos Residenciais
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
├── cypress-bdd-automation-testing/ # Automação Cypress para Área do Aluno
│   ├── cypress/                  # Testes BDD (.feature), Definição de passos (Steps) e Page Objects
│   │   ├── e2e/                  # Funcionalidades e fluxos simulados
│   │   └── support/              # Comandos customizados Cypress e configurações
│   ├── package.json              # Dependências e scripts de teste
│   └── cypress.env.example.json  # Modelo para configuração das credenciais SSO
│
├── k6-performance-testing/       # Testes de carga e estresse com Grafana k6
│   ├── load-test.js              # Script k6 de simulação de carga
│   └── README.md                 # Guia de instalação e limiares de aceitação de SLA
│
└── infrastructure-azure/         # Infraestrutura como Código (IaC) para nuvem Azure
    ├── main.bicep                # Definição dos recursos a provisionar no Azure
    └── parameters.json           # Parâmetros de parametrização de deploy do Bicep
```

---

## 🔒 Segurança e Privacidade de Dados (DevSecOps)

Este repositório foi estruturado seguindo rigorosas práticas de segurança da informação para blindar dados corporativos e credenciais confidenciais:

| Recurso Sensível | Localização Original | Status no Git | Estratégia de Segurança |
| :--- | :--- | :--- | :--- |
| **Credenciais de Acesso** | `cypress-bdd-automation-testing/cypress.env.json` | 🚫 **Ignorado** | Excluído do controle de versão. Disponibilizado o template genérico [cypress.env.example.json](file:///c:/Projetos/Trampo%20teste/cypress-bdd-automation-testing/cypress.env.example.json) para preenchimento individual local. |
| **Banco de Dados Local** | `finances-app-clean-arch/api/MinhasFinancas.API/*.db`<br>`finances-app-clean-arch/data/*.db` | 🚫 **Ignorado** | Arquivos SQLite removidos do rastreamento para evitar vazamento de dados de simulações. A aplicação gera bases de dados zeradas na primeira execução. |
| **Relatórios e Mídias** | `cypress-bdd-automation-testing/allure-results/`<br>`cypress-bdd-automation-testing/allure-report/`<br>`cypress/screenshots/`<br>`cypress/videos/` | 🚫 **Ignorado** | Relatórios locais e mídias de falha de teste são ignorados para manter a árvore do repositório leve e sem arquivos gerados dinamicamente. |
| **Variáveis de Ambiente** | `.env`, `.env.local` | 🚫 **Ignorado** | Arquivos de ambiente locais do React/Node.js são excluídos de commits de forma global. |

---

## 🛠️ Como Iniciar Localmente

### Guia Rápido de Execução

| Objetivo | Diretório de Trabalho | Comando | Descrição / Resultado |
| :--- | :--- | :--- | :--- |
| **Rodar Aplicação Finanças** | `finances-app-clean-arch/` | `docker-compose up --build` | Executa o backend (.NET) e frontend (React) em containers. |
| **Acessar API Swagger** | — | — | Acesse `http://localhost:5000/swagger` no navegador com a API rodando. |
| **Acessar Frontend Web** | — | — | Acesse `http://localhost:5173` no navegador. |
| **Instalar Cypress** | `cypress-bdd-automation-testing/` | `npm install` | Instala as dependências necessárias para a suíte de testes de QA. |
| **Configurar Segredos** | `cypress-bdd-automation-testing/` | `cp cypress.env.example.json cypress.env.json` | Cria o arquivo de credenciais local (preencha-o antes de rodar os testes). |
| **Executar Testes Cypress** | `cypress-bdd-automation-testing/` | `npm run test` | Abre o Cypress Test Runner interativo para execução dos cenários. |
| **Executar Teste Carga k6** | `k6-performance-testing/` | `k6 run load-test.js` | Executa o teste completo de estresse e performance da API e valida SLAs. |
| **Executar Teste Rápido k6** | `k6-performance-testing/` | `k6 run load-test.js --vus 1 --duration 1s` | Smoke test de validação rápida com 1 usuário e 1 iteração. |
| **Restauração do Backend C#** | `finances-app-clean-arch/tests/backend/` | `dotnet restore MinhasFinancas.Tests.sln` | Restaura dependências NuGet do backend de testes. |
| **Rodar Testes de Unidade C#** | `finances-app-clean-arch/tests/backend/` | `dotnet test MinhasFinancas.UnitTests/MinhasFinancas.UnitTests.csproj` | Roda os testes unitários do backend .NET. |

---

*Desenvolvido com excelência técnica para fins de portfólio de engenharia. Dúvidas ou sugestões, sinta-se à vontade para abrir uma issue!*
