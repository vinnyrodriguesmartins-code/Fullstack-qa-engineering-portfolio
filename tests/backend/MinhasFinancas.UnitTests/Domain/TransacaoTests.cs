using System.Reflection;
using MinhasFinancas.Domain.Entities;
using Xunit;

namespace MinhasFinancas.UnitTests.Domain;

public class TransacaoTests
{
    [Fact]
    public void Transacao_MudarTipoAposDefinirCategoria_DeveGarantirConsistencia()
    {
        var categoriaReceita = new Categoria
        {
            Descricao = "Salário",
            Finalidade = Categoria.EFinalidade.Receita
        };

        var transacao = new Transacao
        {
            Descricao = "Teste",
            Valor = 100,
            Tipo = Transacao.ETipo.Receita
        };

        DefinirPropriedadeInterna(transacao, "Categoria", categoriaReceita);

        transacao.Tipo = Transacao.ETipo.Despesa;

        Assert.Equal(Transacao.ETipo.Despesa, transacao.Tipo);
        Assert.NotNull(transacao.Categoria);
        Assert.False(transacao.Categoria!.PermiteTipo(transacao.Tipo), "O bug permitiu tipo Despesa em categoria de Receita");
    }

    [Fact]
    public void Transacao_MudarTipoAposDefinirPessoa_DeveGarantirConsistencia()
    {
        var pessoaMenor = new Pessoa
        {
            Nome = "Joãozinho",
            DataNascimento = DateTime.Today.AddYears(-10)
        };

        var transacao = new Transacao
        {
            Descricao = "Teste",
            Valor = 100,
            Tipo = Transacao.ETipo.Despesa
        };

        DefinirPropriedadeInterna(transacao, "Pessoa", pessoaMenor);

        transacao.Tipo = Transacao.ETipo.Receita;

        Assert.Equal(Transacao.ETipo.Receita, transacao.Tipo);
        Assert.NotNull(transacao.Pessoa);
        Assert.False(transacao.Pessoa!.EhMaiorDeIdade(), "O bug permitiu receita para menor de idade");
    }

    private static void DefinirPropriedadeInterna(object instance, string propertyName, object? value)
    {
        var property = instance.GetType().GetProperty(propertyName, BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);
        property?.SetValue(instance, value);
    }
}
