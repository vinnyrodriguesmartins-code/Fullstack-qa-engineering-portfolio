using System.Net;
using System.Net.Http.Json;
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

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var error = (await response.Content.ReadFromJsonAsync<ErrorResponseDto>())!;
        Assert.NotNull(error);
        Assert.Equal(400, error.StatusCode);
        Assert.Contains("Não é possível registrar despesa em categoria de receita", error.Message);
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

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var error = (await response.Content.ReadFromJsonAsync<ErrorResponseDto>())!;
        Assert.NotNull(error);
        Assert.Equal(400, error.StatusCode);
        Assert.Contains("Não é possível registrar receita em categoria de despesa", error.Message);
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
        var result = (await response.Content.ReadFromJsonAsync<TransacaoDto>())!;
        Assert.NotNull(result);
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal("Transferência", result.Descricao);
        Assert.Equal(200, result.Valor);
        Assert.Equal(Transacao.ETipo.Receita, result.Tipo);
        Assert.Equal(adulto.Id, result.PessoaId);
        Assert.Equal(categoria.Id, result.CategoriaId);
    }
}
