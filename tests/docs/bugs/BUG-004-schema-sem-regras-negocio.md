# BUG-004 — Schema Zod não valida regras de negócio no front-end

## Regra de negócio

- Menor de idade não pode registrar receitas
- Categoria deve ser compatível com o tipo da transação

## Comportamento esperado

Validação no schema (Zod) ou camada equivalente impede submit inválido antes da chamada à API.

## Comportamento observado

`transacaoSchema` em `web/src/lib/schemas.ts` valida apenas campos obrigatórios e valor positivo. As regras de menor/categoria ficam parcialmente no componente (`TransacaoForm`), sem cobertura centralizada no schema.

## Evidência

- `web/src/lib/schemas.ts`
- `tests/frontend/unit/business-rules.test.ts` — regras documentadas fora do schema
- `web/src/components/molecules/TransacaoForm.tsx` — validação ad hoc de menor

## Impacto

Regras espalhadas, difícil reutilização e maior risco de bypass se outro fluxo criar transações.

## Severidade

Baixa
