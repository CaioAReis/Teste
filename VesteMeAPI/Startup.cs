using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VesteMeAPI.Data;
using Microsoft.EntityFrameworkCore;
using VesteMeAPI.Services.IServices;
using VesteMeAPI.Services;

namespace VesteMeAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //  Configurando o banco de dados
            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<AplicationDBContext>(option => 
                option.UseMySql(connectionString, MySqlServerVersion.AutoDetect(connectionString)));

            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<IEnderecoService, EnderecoService>();
            services.AddScoped<IPedidoService, PedidoService>();
            services.AddScoped<ITamanhoService, TamanhoService>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
