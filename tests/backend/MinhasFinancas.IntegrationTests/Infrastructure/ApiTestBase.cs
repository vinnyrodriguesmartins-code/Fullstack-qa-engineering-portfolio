using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using MinhasFinancas.Application.DTOs;
using MinhasFinancas.Domain.Entities;
using Xunit;

namespace MinhasFinancas.IntegrationTests.Infrastructure;

public class ApiTestBase : IClassFixture<CustomWebApplicationFactory>, IAsyncLifetime
{
    protected readonly HttpClient Client;
    protected readonly CustomWebApplicationFactory Factory;

    protected ApiTestBase(CustomWebApplicationFactory factory)
    {
        Factory = factory;
        Client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    public Task InitializeAsync() => Task.CompletedTask;

    public async Task DisposeAsync()
    {
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<MinhasFinancas.Infrastructure.Data.MinhasFinancasDbContext>();
        await db.Database.EnsureDeletedAsync();
    }

    protected async Task<PessoaDto> CriarPessoaAsync(string nome, DateTime dataNascimento)
    {
        var response = await Client.PostAsJsonAsync("/api/v1.0/pessoas", new CreatePessoaDto
        {
            Nome = nome,
            DataNascimento = dataNascimento
        });

        response.EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<PessoaDto>())!;
    }

    protected async Task<CategoriaDto> CriarCategoriaAsync(string descricao, Categoria.EFinalidade finalidade)
    {
        var response = await Client.PostAsJsonAsync("/api/v1.0/categorias", new CreateCategoriaDto
        {
            Descricao = descricao,
            Finalidade = finalidade
        });

        response.EnsureSuccessStatusCode();
        return (await response.Content.ReadFromJsonAsync<CategoriaDto>())!;
    }

    protected Task<HttpResponseMessage> CriarTransacaoAsync(CreateTransacaoDto dto) =>
        Client.PostAsJsonAsync("/api/v1.0/transacoes", dto);
}
