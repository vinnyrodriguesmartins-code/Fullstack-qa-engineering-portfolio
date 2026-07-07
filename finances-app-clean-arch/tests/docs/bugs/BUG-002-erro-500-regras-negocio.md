# BUG-002 — Violações de regra de negócio retornam HTTP 500

## Regra de negócio

Operações inválidas (menor registrando receita, categoria incompatível com tipo) devem ser rejeitadas com resposta clara ao cliente.

## Comportamento esperado

- `POST /api/v1.0/transacoes` com dados inválidos retorna `400 Bad Request` com mensagem de validação

## Comportamento observado

A entidade `Transacao` lança `InvalidOperationException` ao violar regras, mas:

1. `TransacoesController.Create` captura apenas `ArgumentException`
2. `ExceptionMiddleware` converte exceções não tratadas em `500 Internal Server Error`

## Evidência

- `api/MinhasFinancas.Domain/Entities/Transacao.cs` — validações nas propriedades de navegação
- `api/MinhasFinancas.API/Controllers/TransacoesController.cs` — catch parcial
- `api/MinhasFinancas.API/Middlewares/ExceptionMiddleware.cs` — resposta genérica 500
- Testes: `MenorDeIdadeReceitaTests`, `CategoriaFinalidadeTests`

## Impacto

Cliente não distingue erro de validação de falha interna; experiência ruim e dificulta tratamento no front-end.

## Severidade

Média
