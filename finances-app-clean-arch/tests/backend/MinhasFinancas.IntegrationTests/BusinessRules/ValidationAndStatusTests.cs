using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Text.Json.Nodes;
using MinhasFinancas.Application.DTOs;
using MinhasFinancas.Domain.Entities;
using MinhasFinancas.IntegrationTests.Infrastructure;
using Xunit;

namespace MinhasFinancas.IntegrationTests.BusinessRules;

public class ValidationAndStatusTests : ApiTestBase
{
    public ValidationAndStatusTests(CustomWebApplicationFactory factory) : base(factory) { }

    [Fact]
    public async Task PostPessoa_SemNome_DeveRetornarBadRequest()
    {
        var response = await Client.PostAsJsonAsync("/api/v1.0/pessoas", new CreatePessoaDto
        {
            Nome = "",
            DataNascimento = DateTime.Today.AddYears(-20)
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var validationDetails = await response.Content.ReadFromJsonAsync<JsonNode>();
        Assert.NotNull(validationDetails);
        
        var errors = validationDetails["errors"];
        Assert.NotNull(errors);
        
        var nomeErrors = errors["Nome"]?.AsArray();
        Assert.NotNull(nomeErrors);
        var errorMsg = nomeErrors[0]?.GetValue<string>();
        Assert.Contains("Nome é obrigatório", errorMsg);
    }

    [Fact]
    public async Task PostCategoria_SemDescricao_DeveRetornarBadRequest()
    {
        var response = await Client.PostAsJsonAsync("/api/v1.0/categorias", new CreateCategoriaDto
        {
            Descricao = "",
            Finalidade = Categoria.EFinalidade.Despesa
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var validationDetails = await response.Content.ReadFromJsonAsync<JsonNode>();
        Assert.NotNull(validationDetails);
        
        var errors = validationDetails["errors"];
        Assert.NotNull(errors);
        
        var descErrors = errors["Descricao"]?.AsArray();
        Assert.NotNull(descErrors);
        var errorMsg = descErrors[0]?.GetValue<string>();
        Assert.Contains("Descrição é obrigatória", errorMsg);
    }

    [Fact]
    public async Task PostTransacao_ValorZeroOuNegativo_DeveRetornarBadRequest()
    {
        var adulto = await CriarPessoaAsync("Adulto Validacao", DateTime.Today.AddYears(-25));
        var categoria = await CriarCategoriaAsync("Geral Validacao", Categoria.EFinalidade.Ambas);

        var response = await CriarTransacaoAsync(new CreateTransacaoDto
        {
            Descricao = "Transação com valor zerado",
            Valor = 0,
            Tipo = Transacao.ETipo.Despesa,
            PessoaId = adulto.Id,
            CategoriaId = categoria.Id,
            Data = DateTime.Today
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var validationDetails = await response.Content.ReadFromJsonAsync<JsonNode>();
        Assert.NotNull(validationDetails);
        
        var errors = validationDetails["errors"];
        Assert.NotNull(errors);
        
        var valorErrors = errors["Valor"]?.AsArray();
        Assert.NotNull(valorErrors);
        var errorMsg = valorErrors[0]?.GetValue<string>();
        Assert.Contains("Valor deve ser positivo", errorMsg);
    }

    [Fact]
    public async Task GetPessoa_Inexistente_DeveRetornarNotFound()
    {
        var response = await Client.GetAsync($"/api/v1.0/pessoas/{Guid.NewGuid()}");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetCategoria_Inexistente_DeveRetornarNotFound()
    {
        var response = await Client.GetAsync($"/api/v1.0/categorias/{Guid.NewGuid()}");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetTransacao_Inexistente_DeveRetornarNotFound()
    {
        var response = await Client.GetAsync($"/api/v1.0/transacoes/{Guid.NewGuid()}");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task PutPessoa_Inexistente_DeveRetornarNotFound()
    {
        var response = await Client.PutAsJsonAsync($"/api/v1.0/pessoas/{Guid.NewGuid()}", new UpdatePessoaDto
        {
            Nome = "Nome Qualquer",
            DataNascimento = DateTime.Today.AddYears(-20)
        });
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeletePessoa_Inexistente_DeveRetornarNotFound()
    {
        var response = await Client.DeleteAsync($"/api/v1.0/pessoas/{Guid.NewGuid()}");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetTotaisPessoas_DeveRetornarOk()
    {
        var response = await Client.GetAsync("/api/v1.0/totais/pessoas");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var json = await response.Content.ReadFromJsonAsync<JsonNode>();
        Assert.NotNull(json);
        Assert.NotNull(json["items"]);
        Assert.NotNull(json["totalCount"]);
        Assert.NotNull(json["page"]);
        Assert.NotNull(json["pageSize"]);
        Assert.NotNull(json["totalPages"]);
    }

    [Fact]
    public async Task GetTotaisCategorias_DeveRetornarOk()
    {
        var response = await Client.GetAsync("/api/v1.0/totais/categorias");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var json = await response.Content.ReadFromJsonAsync<JsonNode>();
        Assert.NotNull(json);
        Assert.NotNull(json["items"]);
        Assert.NotNull(json["totalCount"]);
        Assert.NotNull(json["page"]);
        Assert.NotNull(json["pageSize"]);
        Assert.NotNull(json["totalPages"]);
    }
}
