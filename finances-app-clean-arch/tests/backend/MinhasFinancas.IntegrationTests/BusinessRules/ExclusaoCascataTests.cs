using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MinhasFinancas.Application.DTOs;
using MinhasFinancas.Domain.Entities;
using MinhasFinancas.Infrastructure.Data;
using MinhasFinancas.IntegrationTests.Infrastructure;
using Xunit;

namespace MinhasFinancas.IntegrationTests.BusinessRules;

public class ExclusaoCascataTests : ApiTestBase
{
    public ExclusaoCascataTests(CustomWebApplicationFactory factory) : base(factory) { }

    [Fact]
    public async Task DeletePessoa_DeveRemoverTransacoesAssociadas()
    {
        var pessoa = await CriarPessoaAsync("Com Transações", DateTime.Today.AddYears(-30));
        var categoria = await CriarCategoriaAsync("Contas", Categoria.EFinalidade.Despesa);

        var createResponse = await CriarTransacaoAsync(new CreateTransacaoDto
        {
            Descricao = "Conta de luz",
            Valor = 150,
            Tipo = Transacao.ETipo.Despesa,
            PessoaId = pessoa.Id,
            CategoriaId = categoria.Id,
            Data = DateTime.Today
        });
        createResponse.EnsureSuccessStatusCode();

        var deleteResponse = await Client.DeleteAsync($"/api/v1.0/pessoas/{pessoa.Id}");

        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

        // Validação física direta no banco via SQL puro (evitando cache do EF Core)
        var transacoesRestantes = await ExecuteScalarSqlAsync<long>(
            "SELECT COUNT(*) FROM Transacoes WHERE PessoaId = @PessoaId",
            ("@PessoaId", pessoa.Id.ToString())
        );

        Assert.Equal(0, transacoesRestantes);
    }
}
