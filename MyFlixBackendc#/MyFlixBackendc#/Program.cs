using Microsoft.EntityFrameworkCore;
using MyFlixBackendc_.Data;
using DotNetEnv;
using MyFlixBackendc_.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text; // Corrected syntax with a semicolon at the end of the statement.


Env.Load(); // Load environment variables from .env  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.  
builder.Services.AddCors(options=>
{
    options.AddPolicy("AllowMultipleOrigins",
        policy =>
        policy.WithOrigins("http://localhost:5174",
                "http://localhost:5173")
        
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle  

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<FavoriteMovieDbContext>(options =>
   options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));  

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Token"]!)),
        ValidateIssuerSigningKey = true,
    };
});
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Configure the HTTP request pipeline.  
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowMultipleOrigins");
//app.UseHttpsRedirection();
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();
app.MigrateDB().Wait();
// Ensure the DataExtensions namespace is included and the method is asynchronous.  

app.Run();
