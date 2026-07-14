using System.Net;
using System.Text.Json;

namespace MinhasFinancas.API.Middlewares;

/// <summary>
/// Middleware para tratamento global de exceções.
/// </summary>
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly Microsoft.AspNetCore.Hosting.IWebHostEnvironment _env;

    /// <summary>
    /// Construtor com injeção do ambiente web.
    /// </summary>
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, Microsoft.AspNetCore.Hosting.IWebHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    /// <summary>
    /// Invoca o middleware.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ocorreu uma exceção não tratada.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        
        var isBusinessException = exception is InvalidOperationException;
        context.Response.StatusCode = isBusinessException 
            ? (int)HttpStatusCode.BadRequest 
            : (int)HttpStatusCode.InternalServerError;

        // Oculta informações sensíveis em produção (OWASP A06:2021 / Information Disclosure)
        var detailedError = _env.IsDevelopment() 
            ? exception.Message 
            : "Consulte os logs do servidor para obter mais informações.";

        var response = new
        {
            StatusCode = context.Response.StatusCode,
            Message = isBusinessException ? exception.Message : "Ocorreu um erro interno no servidor.",
            Detailed = detailedError
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}

/// <summary>
/// Extensões para o middleware de exceção.
/// </summary>
public static class ExceptionMiddlewareExtensions
{
    /// <summary>
    /// Adiciona o middleware de tratamento de exceções.
    /// </summary>
    public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionMiddleware>();
    }
}