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

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var error = (await response.Content.ReadFromJsonAsync<ErrorResponseDto>())!;
        Assert.NotNull(error);
        Assert.Equal(400, error.StatusCode);
        Assert.Contains("Menores de 18 anos não podem registrar receitas", error.Message);
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
        var result = (await response.Content.ReadFromJsonAsync<TransacaoDto>())!;
        Assert.NotNull(result);
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal("Cinema", result.Descricao);
        Assert.Equal(40, result.Valor);
        Assert.Equal(Transacao.ETipo.Despesa, result.Tipo);
        Assert.Equal(menor.Id, result.PessoaId);
        Assert.Equal(categoria.Id, result.CategoriaId);
    }
}
