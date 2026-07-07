using MinhasFinancas.Domain.Entities;
using Xunit;

namespace MinhasFinancas.UnitTests.Domain;

public class CategoriaTests
{
    [Theory]
    [InlineData(Categoria.EFinalidade.Despesa, Transacao.ETipo.Despesa, true)]
    [InlineData(Categoria.EFinalidade.Despesa, Transacao.ETipo.Receita, false)]
    [InlineData(Categoria.EFinalidade.Receita, Transacao.ETipo.Receita, true)]
    [InlineData(Categoria.EFinalidade.Receita, Transacao.ETipo.Despesa, false)]
    [InlineData(Categoria.EFinalidade.Ambas, Transacao.ETipo.Despesa, true)]
    [InlineData(Categoria.EFinalidade.Ambas, Transacao.ETipo.Receita, true)]
    public void PermiteTipo_DeveRespeitarFinalidadeDaCategoria(
        Categoria.EFinalidade finalidade,
        Transacao.ETipo tipo,
        bool esperado)
    {
        var categoria = new Categoria
        {
            Descricao = "Teste",
            Finalidade = finalidade
        };

        var resultado = categoria.PermiteTipo(tipo);

        Assert.Equal(esperado, resultado);
    }
}
