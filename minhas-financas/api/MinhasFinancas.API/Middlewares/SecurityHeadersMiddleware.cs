using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace MinhasFinancas.API.Middlewares;

/// <summary>
/// Middleware para injetar cabeçalhos de segurança HTTP (OWASP Top 10 / Nikto / Veracode).
/// </summary>
public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    /// <summary>
    /// Construtor.
    /// </summary>
    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    /// <summary>
    /// Injeta os cabeçalhos de segurança na resposta HTTP.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        // Evita Clickjacking (OWASP A05:2021)
        context.Response.Headers.Append("X-Frame-Options", "DENY");

        // Previne MIME sniffing (Veracode / Nikto check)
        context.Response.Headers.Append("X-Content-Type-Options", "nosniff");

        // Desativa filtro XSS do browser legado em favor do CSP (OWASP A03:2021)
        context.Response.Headers.Append("X-XSS-Protection", "0");

        // Referrer-Policy restrita para evitar vazamento de caminhos de requisição
        context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");

        // Permissions-Policy restringindo acesso a recursos físicos e sensíveis do cliente
        context.Response.Headers.Append("Permissions-Policy", "geolocation=(), camera=(), microphone=()");

        // Content-Security-Policy (CSP) robusta
        // Permite scripts/estilos inline controlados para suportar o painel do Swagger
        context.Response.Headers.Append("Content-Security-Policy", 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "connect-src 'self' http://localhost:5000 https://localhost:5001 http://localhost:5173 https://localhost:5173; " +
            "frame-ancestors 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self';");

        await _next(context);
    }
}

/// <summary>
/// Métodos de extensão para facilitar o registro do middleware.
/// </summary>
public static class SecurityHeadersMiddlewareExtensions
{
    /// <summary>
    /// Registra o middleware de cabeçalhos de segurança no pipeline.
    /// </summary>
    public static IApplicationBuilder UseSecurityHeadersMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<SecurityHeadersMiddleware>();
    }
}
