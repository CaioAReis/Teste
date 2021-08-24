using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VesteMeAPI.Controllers
{
    [Route("")]
    [ApiController]
    public class HelloWorldController : ControllerBase
    {
        //  Testando o controller
        [HttpGet]
        public string HelloWorld()
        {
            return "Hello World, Web API with ASP.Net Core.";
        }

        [HttpGet("anonimo")]
        [AllowAnonymous]
        public string Anonimos() => "Anônimo";

        [HttpGet("autenticado")]
        [Authorize]
        public string Autenticado() => String.Format("Autenticado - {0}", User.Identity.Name);

        [HttpGet("funcionario")]
        [Authorize(Roles = "1,2")]
        public string Cliente() => "Funcionário";

        [HttpGet("adm")]
        [Authorize(Roles = "1")]
        public string Adm() => "Administrador";
    }
}
