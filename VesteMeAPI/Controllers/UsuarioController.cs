using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VesteMeAPI.Models;
using VesteMeAPI.Services;
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
        [Authorize]
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
        [Authorize(Roles = "1,2")]
        public async Task<ActionResult<Usuario>> BuscarUsuario(int id)
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(id);
                if (usuario != null) 
                {
                    usuario.Senha = "";
                    return Ok(usuario);
                }
                else return NotFound($"Usuário com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar usuário.");
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> BuscarUsuarioPorEmailESenha([FromBody] UsuarioDTO usuario)
        {
            try
            {
                var usu = await _usuarioService.BuscarUsuarioPorEmailESenha(usuario.Email, usuario.Senha);
                if (usu != null) {
                    var token = TokenService.GenerateToken(usu);
                    usu.Senha = "";
                    return new {
                        usu = usu,
                        token = token
                    };
                }
                else return NotFound("Email ou senha inválidos");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar usuário.");
            }
        }

        [HttpPost]
        [AllowAnonymous]
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

        [HttpPost("confirmar/{id}")]
        [Authorize]
        public async Task<ActionResult<bool>> ConfirmarLogadoUsuario(int id, [FromBody] UsuarioDTO usuarioDTO)
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(id);
                if (usuario != null) {
                    if (usuario.Senha == usuarioDTO.Senha) return Ok(true);
                    else return Ok(false);
                } else return NotFound($"Usuário com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar dados do usuário.");
            }
        }
        
        [HttpPatch("senha/{id}")]
        [Authorize]
        public async Task<ActionResult> AtualizarSenhaUsuario(int id, [FromBody] UsuarioDTO usuarioDTO)
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(id);
                if (usuario != null) 
                {
                    usuario.Senha = usuarioDTO.Senha;
                    await _usuarioService.AtualizarUsuario(usuario);
                    return NoContent();
                } else return NotFound($"Usuário com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar dados do usuário.");
            }
        }

        [HttpPut("dados/{id}")]
        [Authorize]
        public async Task<ActionResult> AtualizarDadosUsuario(int id, [FromBody] UsuarioDTO usuarioDTO)
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuario(id);
                if (usuario != null) 
                {
                    usuario.Nome = usuarioDTO.Nome;
                    usuario.CPF = usuarioDTO.CPF;
                    usuario.Email = usuarioDTO.Email;
                    usuario.DataNascimento = usuarioDTO.DataNascimento;
                    usuario.Celular = usuarioDTO.Celular;
                    usuario.Telefone = usuarioDTO.Telefone;
		    usuario.TipoUsuarioID = usuarioDTO.TipoUsuarioID;

                    await _usuarioService.AtualizarUsuario(usuario);
                    return NoContent();
                } else return NotFound($"Usuário com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar dados do usuário.");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
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