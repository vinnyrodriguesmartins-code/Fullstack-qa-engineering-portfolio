using MinhasFinancas.Domain.Entities;
using Xunit;

namespace MinhasFinancas.UnitTests.Domain;

public class PessoaTests
{
    [Fact]
    public void EhMaiorDeIdade_DeveRetornarTrue_QuandoPessoaTem18AnosOuMais()
    {
        var pessoa = new Pessoa
        {
            Nome = "Adulto",
            DataNascimento = DateTime.Today.AddYears(-18)
        };

        Assert.True(pessoa.EhMaiorDeIdade());
        Assert.Equal(18, pessoa.Idade);
    }

    [Fact]
    public void EhMaiorDeIdade_DeveRetornarFalse_QuandoPessoaTemMenosDe18Anos()
    {
        var pessoa = new Pessoa
        {
            Nome = "Menor",
            DataNascimento = DateTime.Today.AddYears(-17)
        };

        Assert.False(pessoa.EhMaiorDeIdade());
        Assert.Equal(17, pessoa.Idade);
    }

    [Fact]
    public void Idade_DeveConsiderarMesEDia_NoCalculo()
    {
        var pessoa = new Pessoa
        {
            Nome = "Quase 18",
            DataNascimento = DateTime.Today.AddYears(-18).AddDays(1)
        };

        Assert.Equal(17, pessoa.Idade);
        Assert.False(pessoa.EhMaiorDeIdade());
    }
}
