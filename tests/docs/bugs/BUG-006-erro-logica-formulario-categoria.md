# BUG-006 — Erro de lógica no formulário de transação (Categoria)

## Regra de negócio

Ao selecionar uma categoria no formulário de transação, o campo `categoriaId` deve ser preenchido corretamente.

## Comportamento esperado

O formulário deve salvar a referência correta para a categoria selecionada.

## Comportamento observado

No componente `TransacaoForm.tsx`, o handler `onChange` do `LazyCategoriaSelect` possui um erro de digitação/lógica:
1. Tenta atualizar o campo `pessoaId` no formulário em vez de `categoriaId`.
2. Utiliza uma variável `p` que não existe no escopo da função, o que causa um erro de referência em tempo de execução.

```typescript
// web/src/components/molecules/TransacaoForm.tsx:83
onChange={(c) => {
  setSelectedCategoriaObj(c ?? null);
  setValue("pessoaId", p?.id ?? ""); // BUG: deve ser "categoriaId" e "c?.id"
}}
```

## Evidência

- `web/src/components/molecules/TransacaoForm.tsx` (Linha 85)
- Teste a ser implementado: `TransacaoForm_SelecionarCategoria_DeveDefinirCategoriaId`.

## Impacto

O formulário quebra (crash) ao selecionar qualquer categoria, impedindo a criação de transações.

## Severidade

Crítica

> [!NOTE]
> Durante a verificação técnica em 26/06/2026, observou-se que o código em `TransacaoForm.tsx` já utiliza `setValue("categoriaId", c?.id ?? "")`. 
> O bug foi marcado como **Resolvido/Inexistente** nesta versão do código-fonte, e um teste de regressão foi adicionado ao repositório.
