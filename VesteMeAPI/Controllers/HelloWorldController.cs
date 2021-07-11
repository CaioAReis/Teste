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
    }
}
