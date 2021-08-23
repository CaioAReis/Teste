using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VesteMeAPI.Models;
using VesteMeAPI.Services.IServices;

namespace VesteMeAPI.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Usuario>>> ListarUsuarios()
        {
            try
            {
                var usuarios = await _usuarioService.ListarUsuarios();
                return Ok(usuarios);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar usuarios.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> BuscarUsuario(int id)
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(id);
                if (usuario != null) return Ok(usuario);
                else return NotFound($"Usuário com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar usuário.");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> BuscarUsuarioPorEmailESenha([FromBody] UsuarioDTO usuario)
        {
            try
            {
                var usu = await _usuarioService.BuscarUsuarioPorEmailESenha(usuario.Email, usuario.Senha);
                if (usu != null) return Ok(usu);
                else return NotFound("Usuário não encontrado!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar usuário.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CriarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                await _usuarioService.CriarUsuario(usuario);
                return CreatedAtAction(nameof(BuscarUsuario), new { id = usuario.ID}, usuario);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar usuário.");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarUsuario(int id, [FromBody] Usuario usuario)
        {
            try
            {
                if (usuario.ID == id) {
                    await _usuarioService.AtualizarUsuario(usuario);
                    return NoContent();
                } else return BadRequest("Dados inconssistentes");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar usuário.");
            }
        }
    }
}