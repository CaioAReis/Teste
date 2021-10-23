using System.Collections.Generic;
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
    public class TamanhoController : ControllerBase
    {

        private ITamanhoService _tamanhoService;

        public TamanhoController(ITamanhoService tamanhoService)
        {
            _tamanhoService = tamanhoService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IAsyncEnumerable<Tamanho>>> ListarTamanhos()
        {
            try
            {
                var tamanhos = await _tamanhoService.ListarTamanhos();
                return Ok(tamanhos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar tamanhos.");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<Tamanho>> BuscarTamanho(int id)
        {
            try
            {
                var tamanho = await _tamanhoService.BuscarTamanho(id);
                if (tamanho != null) return Ok(tamanho);
                else return NotFound($"Tamanho com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar tamanhos.");
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> CriarTamanho([FromBody] Tamanho tamanho)
        {
            try
            {
                await _tamanhoService.CriarTamanho(tamanho);
                return CreatedAtAction(nameof(BuscarTamanho), new { id = tamanho.ID}, tamanho);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar tamanho.");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> AtualizarTamanho(int id, [FromBody] Tamanho tamanho)
        {
            try
            {
                if (tamanho.ID == id) {
                    await _tamanhoService.AtualizarTamanho(tamanho);
                    return NoContent();
                } else return BadRequest("Dados inconssistentes");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar tamanho.");
            }
        }
    }
}