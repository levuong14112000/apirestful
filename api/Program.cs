
using System.Text;
using api.DAO;
using api.Data;
using api.Entities.Identity;
using api.Exceptions;
using api.Helpers;
using api.Middleware;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AnyConnectionName")));
builder.Services.AddSingleton<IConnectionMultiplexer>(_ => {
    var redisUrl = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"),true);
    return ConnectionMultiplexer.Connect(redisUrl);
});
builder.Services.AddControllers();
/*
IdentityException
*/
builder.Services
    .AddIdentityCore<AppUser>(option => {
        option.Password.RequireNonAlphanumeric = false;
        option.Password.RequireDigit = false;
        option.Password.RequireLowercase = false;
        option.Password.RequireUppercase = false;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager<SignInManager<AppUser>>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
        ValidIssuer = builder.Configuration["Token:Issuer"],
        ValidateIssuer = true,
        ValidAudience = builder.Configuration["Token:Audiece"]
    };
});
                                            
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// declare sevice for dependency injection
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IBasketResponsitory, BasketReponsitory>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAutoMapper(typeof(MyAutoMapper));

//Error show validate
builder.Services.Configure<ApiBehaviorOptions>(options => {
    options.InvalidModelStateResponseFactory = actionContext => 
    {
        var errors = actionContext.ModelState
        .Where(e => e.Value.Errors.Count > 0)
        .SelectMany(x => x.Value.Errors)
        .Select(x => x.ErrorMessage);
    var errorResponse = new ValidateInputErrorResponse(400);
    errorResponse.Errors = errors;
    return new BadRequestObjectResult(errorResponse);
    };
});
// tra ve client
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://localhost:4200");
    });
});
var app = builder.Build();

app.UseMiddleware<ServerErrorExceptionMiddle>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStatusCodePagesWithReExecute("/errors/{0}");
// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();
app.UseCors();
await AppDbInitializer.Seed(app);

app.Run();
