using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        private IUsuarioService _usuarioService;

        public EnderecoController(IEnderecoService enderecoService, IUsuarioService usuarioService)
        {
            _enderecoService = enderecoService;
            _usuarioService = usuarioService;
        }

        [HttpGet("{id}")]
        // [Authorize]
        public async Task<ActionResult<Endereco>> BuscarEndereco(int id) 
        {
            try
            {
                var endereco = await _enderecoService.BuscarEndereco(id);
                if (endereco != null) return Ok(endereco);
                return NotFound($"Endereço com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar o endereço.");
            }
        }

        [HttpGet("usuario/{idUsuario}")]
        // [Authorize]
        public async Task<ActionResult<Endereco>> BuscarEnderecoDoUsuario(int idUsuario) 
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(idUsuario);
                if (usuario != null) {
                    if (usuario.EnderecoID != null) {
                        var endereco = await _enderecoService.BuscarEndereco((int) usuario.EnderecoID);
                        return Ok(endereco);
                    } else return NotFound("O Usuário ainda não setou o endereço.");
                } else return NotFound($"Usuário com o ID: {idUsuario} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar endereço do usuário.");
            }
        }

        [HttpPost("usuario/{idUsuario}")]
        // [Authorize]
        public async Task<ActionResult> CriarEnderecoDoUsuario(int idUsuario, [FromBody] Endereco endereco) 
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(idUsuario);
                if (usuario != null) {
                    await _enderecoService.CriarEndereco(endereco);
                    usuario.EnderecoID = endereco.ID;
                    usuario.Endereco = endereco;
                    await _usuarioService.AtualizarUsuario(usuario);
                    return CreatedAtAction(nameof(BuscarEndereco), new {id = endereco.ID}, endereco);
                } else return NotFound($"Usuário com o ID: {idUsuario} não foi encontrado."); 
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar endereço do usuário.");
            }
        }

        [HttpPost]
        [Authorize]
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

        [HttpPut("usuario/{idUsuario}")]
        // [Authorize]
        public async Task<ActionResult> AtualizarEnderecoDoUsuario(int idUsuario, [FromBody] Endereco endereco) 
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(idUsuario);
                if (usuario != null) {
                    if (usuario.EnderecoID != null) {
                        endereco.ID = (int) usuario.EnderecoID;
                        await _enderecoService.AtualizarEndereco(endereco);
                        return NoContent();
                    } else return NotFound($"Usuário não tem um endereço para atualizar.");
                } else return NotFound($"Usuário com o ID: {idUsuario} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar o endereço do usuário.");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
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