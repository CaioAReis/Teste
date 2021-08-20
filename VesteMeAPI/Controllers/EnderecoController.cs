using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VesteMeAPI.Models;
using VesteMeAPI.Services.IServices;

namespace VesteMeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private IEnderecoService _enderecoService;

        public EnderecoController(IEnderecoService enderecoService)
        {
            _enderecoService = enderecoService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Endereco>> BuscarEndereco(int id) 
        {
            try
            {
                var endereco = await _enderecoService.BuscarEndereco(id);
                if (endereco == null) 
                    return NotFound($"Endereço com o ID: {id} não foi encontrado.");
                return Ok(endereco);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar o endereço.");
            }
        }

        [HttpGet("usuario/{id}")]
        public async Task<ActionResult<Endereco>> BuscarEnderecoDoUsuario(int id) 
        {
            try
            {
                //  Forma prvisória até a implementação dos serviços de usuário
                var usuario = new Usuario();
                usuario.Nome = "Caio";
                usuario.Email = "Caio@mail.com";
                usuario.Senha = "12345";
                usuario.CPF = "000.000.000-00";
                usuario.EnderecoID = 1;
                usuario.DataNascimento = System.DateTime.Now;

                if (usuario != null) {
                    if (usuario.EnderecoID != null) {
                        var endereco = await _enderecoService.BuscarEnderecoDoUsuario(usuario);
                        return Ok(endereco);
                    }
                    return NotFound("O usuário ainda não definiu um endereço.");
                }
                return NotFound($"Usuário com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar o endereço.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CriarEndereco([FromBody] Endereco endereco) 
        {
            try
            {
                await _enderecoService.CriarEndereco(endereco);
                return CreatedAtAction(nameof(BuscarEndereco), new {id = endereco.ID}, endereco);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar o endereço.");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarEndereco(int id, [FromBody] Endereco endereco) 
        {
            try
            {
                if (id == endereco.ID) {
                    await _enderecoService.AtualizarEndereco(endereco);
                    return NoContent();
                } else return BadRequest("Dados inconssistentes.");
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar o endereço.");
            }
        }

    }
}