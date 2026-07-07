# BUG-005 — Ordem de inicialização permite bypass de validação

## Regra de negócio

Categorias e pessoas possuem regras de validação que devem ser aplicadas a todas as transações (ex: menor não pode ter receita, categoria deve permitir o tipo).

## Comportamento esperado

Independentemente da ordem em que as propriedades são definidas no código, a entidade `Transacao` deve garantir sua integridade.

## Comportamento observado

As validações ocorrem apenas nos setters das propriedades `Categoria` e `Pessoa`. Se a propriedade `Tipo` for alterada *após* a definição da categoria ou pessoa, a validação não é disparada, permitindo estados inconsistentes.

Exemplo de falha:
```csharp
var t = new Transacao { Categoria = catDespesa }; // Tipo padrão é Despesa, ok.
t.Tipo = Receita; // Nenhuma validação é executada aqui!
```

## Evidência

- `api/MinhasFinancas.Domain/Entities/Transacao.cs` — setters validam usando o valor atual de `Tipo`, mas `Tipo` não revalida as associações.
- Teste a ser implementado: `Transacao_AlterarTipoAposCategoria_DeveFalhar`.

## Impacto

Risco de corrupção de dados e bypass total das regras de negócio se o desenvolvedor (ou o model binder do ASP.NET) inicializar o objeto em uma ordem específica.

## Severidade

Alta
