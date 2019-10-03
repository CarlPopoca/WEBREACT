using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using  WEBAPICORE_2._2_USUARIOS.Data;

namespace WEBAPICORE_2._2_USUARIOS
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
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            //Se agrego, para establecer la variable de Conexión a la BD y que se define en el appsettings
            services.AddDbContextPool<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("ContactosConnection")));

            //Se agrego, para especificar que se usara las tablas de identidad de asp net
            services.AddIdentity<IdentityUser, IdentityRole>(
                options => {
                    options.Password.RequiredLength = 10;
                    options.Password.RequiredUniqueChars = 3;
                }
                ).AddEntityFrameworkStores<ApplicationDbContext>();

            //Se agrega que por el metodo configure se puede especificar los tipo de caracteres que se pueden introducir en el password
            /* services.Configure<IdentityOptions>(options =>
             {
                 options.Password.RequiredLength = 10;
                 options.Password.RequiredUniqueChars = 3;
             }
             ); */


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //Se agrega que sitios pueden consumir los servicios y metodos que contenga la API
            app.UseCors(options => options.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
