using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using MinhasFinancas.Infrastructure.Data;
using Xunit;

namespace MinhasFinancas.IntegrationTests.Infrastructure;

public class CustomWebApplicationFactory : WebApplicationFactory<MinhasFinancas.API.Controllers.PessoasController>
{
    private readonly string _databaseName = Guid.NewGuid().ToString();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<MinhasFinancasDbContext>));

            if (descriptor is not null)
            {
                services.Remove(descriptor);
            }

            services.AddDbContext<MinhasFinancasDbContext>(options =>
                options.UseSqlite($"Data Source={_databaseName}.db"));

            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<MinhasFinancasDbContext>();
            db.Database.EnsureCreated();
        });
    }
}
