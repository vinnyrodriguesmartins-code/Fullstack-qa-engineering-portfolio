using System.Net;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using MinhasFinancas.IntegrationTests.Infrastructure;
using Xunit;

namespace MinhasFinancas.IntegrationTests.Infrastructure;

public class RateLimitTests : ApiTestBase
{
    public RateLimitTests(CustomWebApplicationFactory factory) : base(factory) { }

    [Fact]
    public async Task GetPessoas_ExcederRateLimit_DeveRetornarTooManyRequests()
    {
        // Envia 125 requisições concorrentes em paralelo para preencher o limite de 100 e a fila de 10.
        // A partir da 111ª requisição, o servidor deve responder imediatamente com 429.
        var tasks = new List<Task<HttpResponseMessage>>();
        for (int i = 0; i < 125; i++)
        {
            tasks.Add(Client.GetAsync("/api/v1.0/pessoas"));
        }

        var responses = await Task.WhenAll(tasks);
        bool rateLimitAtingido = responses.Any(r => r.StatusCode == HttpStatusCode.TooManyRequests);

        Assert.True(rateLimitAtingido, "O Rate Limiting deveria ter retornado HTTP 429 (TooManyRequests).");
    }
}
