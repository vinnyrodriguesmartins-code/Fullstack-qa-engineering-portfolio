using System.Net;
using System.Net.Http.Json;
using MinhasFinancas.Application.DTOs;
using MinhasFinancas.Domain.Entities;
using MinhasFinancas.IntegrationTests.Infrastructure;
using Xunit;

namespace MinhasFinancas.IntegrationTests.BusinessRules;

public class MenorDeIdadeReceitaTests : ApiTestBase
{
    public MenorDeIdadeReceitaTests(CustomWebApplicationFactory factory) : base(factory) { }

    [Fact]
    public async Task PostTransacao_ReceitaParaMenor_DeveRetornarErro()
    {
        var menor = await CriarPessoaAsync("Menor Teste", DateTime.Today.AddYears(-12));
        var categoria = await CriarCategoriaAsync("Mesada", Categoria.EFinalidade.Receita);

        var response = await CriarTransacaoAsync(new CreateTransacaoDto
        {
            Descricao = "Mesada",
            Valor = 100,
            Tipo = Transacao.ETipo.Receita,
            PessoaId = menor.Id,
            CategoriaId = categoria.Id,
            Data = DateTime.Today
        });

        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
    }

    [Fact]
    public async Task PostTransacao_DespesaParaMenor_DeveRetornarCreated()
    {
        var menor = await CriarPessoaAsync("Menor Despesa", DateTime.Today.AddYears(-12));
        var categoria = await CriarCategoriaAsync("Lazer", Categoria.EFinalidade.Despesa);

        var response = await CriarTransacaoAsync(new CreateTransacaoDto
        {
            Descricao = "Cinema",
            Valor = 40,
            Tipo = Transacao.ETipo.Despesa,
            PessoaId = menor.Id,
            CategoriaId = categoria.Id,
            Data = DateTime.Today
        });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }
}
