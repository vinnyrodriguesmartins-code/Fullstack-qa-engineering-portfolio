using Bogus;
using MinhasFinancas.Domain.Entities;
using Xunit;

namespace MinhasFinancas.UnitTests.Domain;

public class PessoaTests
{
    private readonly Faker _faker = new("pt_BR");

    [Fact]
    public void EhMaiorDeIdade_DeveRetornarTrue_QuandoPessoaTem18AnosOuMais()
    {
        // Usa Bogus para gerar uma idade aleatória acima ou igual a 18 anos
        var anos = _faker.Random.Int(18, 90);
        var pessoa = new Pessoa
        {
            Nome = _faker.Name.FullName(),
            DataNascimento = DateTime.Today.AddYears(-anos)
        };

        Assert.True(pessoa.EhMaiorDeIdade());
        Assert.Equal(anos, pessoa.Idade);
    }

    [Fact]
    public void EhMaiorDeIdade_DeveRetornarFalse_QuandoPessoaTemMenosDe18Anos()
    {
        // Usa Bogus para gerar uma idade aleatória abaixo de 18 anos
        var anos = _faker.Random.Int(1, 17);
        var pessoa = new Pessoa
        {
            Nome = _faker.Name.FullName(),
            DataNascimento = DateTime.Today.AddYears(-anos)
        };

        Assert.False(pessoa.EhMaiorDeIdade());
        Assert.Equal(anos, pessoa.Idade);
    }

    [Fact]
    public void Idade_DeveConsiderarMesEDia_NoCalculo()
    {
        // Cria pessoa nascida exatamente amanhã há 18 anos (ou seja, ainda tem 17 anos hoje)
        var pessoa = new Pessoa
        {
            Nome = _faker.Name.FullName(),
            DataNascimento = DateTime.Today.AddYears(-18).AddDays(1)
        };

        Assert.Equal(17, pessoa.Idade);
        Assert.False(pessoa.EhMaiorDeIdade());
    }
}
