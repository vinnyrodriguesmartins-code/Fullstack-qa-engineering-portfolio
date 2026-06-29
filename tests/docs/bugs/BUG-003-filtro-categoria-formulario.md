# BUG-003 — Formulário de transação não filtra categorias por tipo

## Regra de negócio

Categoria só pode ser usada conforme sua finalidade (receita/despesa/ambas).

## Comportamento esperado

Ao selecionar tipo "Despesa", apenas categorias de despesa ou "Ambas" devem ser listadas (e vice-versa para receita).

## Comportamento observado

`TransacaoForm` renderiza `LazyCategoriaSelect` **sem** passar `selectedTipo`. O componente suporta filtro via parâmetro `tipo` na API, mas o formulário não o utiliza.

## Evidência

- `web/src/components/molecules/TransacaoForm.tsx` — `LazyCategoriaSelect` sem `selectedTipo`
- `web/src/components/molecules/LazyCategoriaSelect.tsx` — suporte a `selectedTipo` existe
- `web/src/lib/apiUtils.ts` — envia `tipo` na query quando informado

## Impacto

Usuário pode selecionar categoria incompatível na UI; erro só aparece após submit (ou retorno 500 da API).

## Severidade

Média
