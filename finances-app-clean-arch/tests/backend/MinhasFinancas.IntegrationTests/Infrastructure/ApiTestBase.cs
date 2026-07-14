using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
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

    public async Task InitializeAsync()
    {
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<MinhasFinancas.Infrastructure.Data.MinhasFinancasDbContext>();
        await db.Database.EnsureCreatedAsync();
    }

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
        var result = (await response.Content.ReadFromJsonAsync<PessoaDto>())!;
        Assert.NotNull(result);
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal(nome, result.Nome);
        Assert.Equal(dataNascimento.Date, result.DataNascimento.Date);
        return result;
    }

    protected async Task<CategoriaDto> CriarCategoriaAsync(string descricao, Categoria.EFinalidade finalidade)
    {
        var response = await Client.PostAsJsonAsync("/api/v1.0/categorias", new CreateCategoriaDto
        {
            Descricao = descricao,
            Finalidade = finalidade
        });

        response.EnsureSuccessStatusCode();
        var result = (await response.Content.ReadFromJsonAsync<CategoriaDto>())!;
        Assert.NotNull(result);
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal(descricao, result.Descricao);
        Assert.Equal(finalidade, result.Finalidade);
        return result;
    }

    protected Task<HttpResponseMessage> CriarTransacaoAsync(CreateTransacaoDto dto) =>
        Client.PostAsJsonAsync("/api/v1.0/transacoes", dto);

    /// <summary>
    /// Executa uma query SQL escalar (ex: SELECT COUNT(*)) diretamente no banco de dados SQLite.
    /// Utilizado para testes de integração de banco de dados (Database Testing / SQL Verification).
    /// </summary>
    protected async Task<T> ExecuteScalarSqlAsync<T>(string sql, params (string Name, object Value)[] parameters)
    {
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<MinhasFinancas.Infrastructure.Data.MinhasFinancasDbContext>();
        var connection = db.Database.GetDbConnection();
        
        if (connection.State != System.Data.ConnectionState.Open)
            await connection.OpenAsync();

        using var command = connection.CreateCommand();
        command.CommandText = sql;
        foreach (var p in parameters)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = p.Name;
            parameter.Value = p.Value;
            command.Parameters.Add(parameter);
        }

        var result = await command.ExecuteScalarAsync();
        if (result == null || result == DBNull.Value)
            return default!;

        return (T)Convert.ChangeType(result, typeof(T))!;
    }
}

public record ErrorResponseDto
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Detailed { get; set; } = string.Empty;
}
