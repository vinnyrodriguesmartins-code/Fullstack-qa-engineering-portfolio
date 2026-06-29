# Minhas Finanças

Sistema de controle de gastos residenciais com Clean Architecture.

## Arquitetura

- **Backend**: .NET 9 Web API (Clean Architecture)
- **Application**: `MinhasFinancas.Application` (serviços, DTOs, validações)
- **Domain**: `MinhasFinancas.Domain` (entidades, interfaces, regras de negócio)
- **Infrastructure**: `MinhasFinancas.Infrastructure` (EF Core, repositórios, seed)
- **Frontend**: React com TypeScript (pasta `web/`)
- **Banco de Dados**: SQLite por padrão (configurável)

## Quickstart — Desenvolvimento local

Pré-requisitos:
- Docker & Docker Compose
- .NET 9 SDK (se quiser rodar API local sem containers)
- `bun` (para rodar o frontend localmente sem Docker)

Com Docker (recomendado):

```bash
docker-compose up --build
```

Isso expõe por padrão:
- API: http://localhost:5000 (Swagger UI em `/swagger`)
- Frontend: http://localhost:5173

Rodando apenas a API localmente (sem Docker):

```bash
cd api/MinhasFinancas.API
dotnet build
dotnet run --project MinhasFinancas.API.csproj
```

Rodando o frontend localmente (sem Docker):

```bash
cd web
bun install
bunx vite
```

Gerar migrations (quando alterar modelos):

```powershell
dotnet ef migrations add <Name> --project MinhasFinancas.Infrastructure --startup-project MinhasFinancas.API
```

## Documentação da API

- Swagger/OpenAPI já habilitado. Acesse `http://localhost:5000/swagger` quando a API estiver rodando.
- Endpoints principais estão em `api/MinhasFinancas.API/Controllers`.

## Qualidade de Código / Análise Estática

- Regras de análise .NET estão ativadas via `Directory.Build.props`.
- Para executar análise localmente use `dotnet build` e verifique warnings/errores.
- Arquivo `sonar-project.properties` está no repositório para integração com SonarQube/SonarCloud.

Exemplo (SonarScanner):

```bash
# Assumindo SonarScanner instalado e configurado
sonar-scanner \
	-Dsonar.projectKey=minhas-financas \
	-Dsonar.sources=. \
	-Dsonar.host.url=<SONAR_URL> \
	-Dsonar.login=<TOKEN>
```

## Notas úteis

- Arquivos importantes:
	- API entry: [api/MinhasFinancas.API/Program.cs](api/MinhasFinancas.API/Program.cs#L1)
	- Application services: [api/MinhasFinancas.Application/Services](api/MinhasFinancas.Application/Services)
	- Domain entities: [api/MinhasFinancas.Domain/Entities](api/MinhasFinancas.Domain/Entities)
	- Infrastructure: [api/MinhasFinancas.Infrastructure](api/MinhasFinancas.Infrastructure)
- Para rodar os testes (quando adicionados), veja projetos `*.Tests` (não incluídos ainda).

---
Arquivo de configurações de análise: `Directory.Build.props` e `sonar-project.properties`.