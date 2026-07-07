using MinhasFinancas.API.Extensions;
using MinhasFinancas.API.Middlewares;
using MinhasFinancas.Domain.Interfaces;
using MinhasFinancas.Infrastructure;
using MinhasFinancas.Infrastructure.Data;
using Asp.Versioning;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Suppress server signature header in Kestrel (Nikto / DAST mitigation)
builder.WebHost.ConfigureKestrel(options =>
{
    options.AddServerHeader = false;
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerGen(options =>
{
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
});

// Add Controllers
builder.Services.AddControllers();

// Add Secure CORS configuration (OWASP A05:2021)
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() 
                     ?? new[] { "http://localhost:5173", "https://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Add API Versioning
builder.Services.AddApiVersioning(options =>
{
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.ReportApiVersions = true;
});

// Add Infrastructure services (DbContext)
builder.Services.AddInfrastructureServices(builder.Configuration);

// Add Application services
builder.Services.AddApplicationServices();

var app = builder.Build();

// Ensure database is created and seeded only in development
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<MinhasFinancasDbContext>();
        var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
        dbContext.Database.EnsureCreated();
        await SeedData.InitializeAsync(unitOfWork);
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Enforce HSTS (OWASP A05:2021 / DAST)
    app.UseHsts();
}

app.UseHttpsRedirection();

// Use Security Headers Middleware (OWASP A03:2021 / Clickjacking / MIME-sniffing)
app.UseSecurityHeadersMiddleware();

// Use Exception Middleware (handles errors and prevents Information Disclosure)
app.UseExceptionMiddleware();

// Use Secure CORS Policy
app.UseCors("DefaultPolicy");

// Use Controllers
app.MapControllers();

// Redirect root to Swagger UI for convenience
app.MapGet("/", () => Results.Redirect("/swagger"));
app.Run();
