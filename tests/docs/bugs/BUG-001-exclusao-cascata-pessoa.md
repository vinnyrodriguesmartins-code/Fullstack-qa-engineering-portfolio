# BUG-001 — Exclusão em cascata de transações ao excluir pessoa

## Regra de negócio

Ao excluir uma pessoa, todas as transações associadas a ela devem ser removidas automaticamente (exclusão em cascata).

## Comportamento esperado

- `DELETE /api/v1.0/pessoas/{id}` retorna `204 No Content`
- Nenhuma transação com `pessoaId` igual ao ID excluído permanece no banco

## Comportamento observado

O relacionamento `Pessoa → Transacao` no `MinhasFinancasDbContext` **não** configura `OnDelete(DeleteBehavior.Cascade)`. A exclusão pode falhar por restrição de chave estrangeira ou deixar transações órfãs, dependendo do provider.

## Evidência

- Arquivo: `api/MinhasFinancas.Infrastructure/Data/MinhasFinancasDbContext.cs` (relacionamentos sem cascade)
- Teste: `tests/backend/MinhasFinancas.IntegrationTests/BusinessRules/ExclusaoCascataTests.cs`

## Impacto

Integridade referencial inconsistente e falha na regra principal de exclusão em cascata.

## Severidade

Alta
