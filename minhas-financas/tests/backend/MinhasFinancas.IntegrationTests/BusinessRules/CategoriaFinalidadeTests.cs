using System.Net;
using MinhasFinancas.Application.DTOs;
using MinhasFinancas.Domain.Entities;
using MinhasFinancas.IntegrationTests.Infrastructure;
using Xunit;

namespace MinhasFinancas.IntegrationTests.BusinessRules;

public class CategoriaFinalidadeTests : ApiTestBase
{
    public CategoriaFinalidadeTests(CustomWebApplicationFactory factory) : base(factory) { }

    [Fact]
    public async Task PostTransacao_DespesaEmCategoriaReceita_DeveRetornarErro()
    {
        var adulto = await CriarPessoaAsync("Adulto", DateTime.Today.AddYears(-25));
        var categoria = await CriarCategoriaAsync("Salário", Categoria.EFinalidade.Receita);

        var response = await CriarTransacaoAsync(new CreateTransacaoDto
        {
            Descricao = "Despesa inválida",
            Valor = 100,
            Tipo = Transacao.ETipo.Despesa,
            PessoaId = adulto.Id,
            CategoriaId = categoria.Id,
            Data = DateTime.Today
        });

        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
    }

    [Fact]
    public async Task PostTransacao_ReceitaEmCategoriaDespesa_DeveRetornarErro()
    {
        var adulto = await CriarPessoaAsync("Adulto 2", DateTime.Today.AddYears(-25));
        var categoria = await CriarCategoriaAsync("Alimentação", Categoria.EFinalidade.Despesa);

        var response = await CriarTransacaoAsync(new CreateTransacaoDto
        {
            Descricao = "Receita inválida",
            Valor = 100,
            Tipo = Transacao.ETipo.Receita,
            PessoaId = adulto.Id,
            CategoriaId = categoria.Id,
            Data = DateTime.Today
        });

        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
    }

    [Fact]
    public async Task PostTransacao_TipoCompativelComCategoriaAmbas_DeveRetornarCreated()
    {
        var adulto = await CriarPessoaAsync("Adulto 3", DateTime.Today.AddYears(-25));
        var categoria = await CriarCategoriaAsync("Geral", Categoria.EFinalidade.Ambas);

        var response = await CriarTransacaoAsync(new CreateTransacaoDto
        {
            Descricao = "Transferência",
            Valor = 200,
            Tipo = Transacao.ETipo.Receita,
            PessoaId = adulto.Id,
            CategoriaId = categoria.Id,
            Data = DateTime.Today
        });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }
}
