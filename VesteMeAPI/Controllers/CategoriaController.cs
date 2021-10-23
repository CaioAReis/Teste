using VesteMeAPI.Models;
using VesteMeAPI.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace VesteMeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private ICategoriaService _categoriaService;

        public CategoriaController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IAsyncEnumerable<Categoria>>> ListarCategorias() {
            try
            {
                var categorias = await _categoriaService.ListarCategorias();
                return Ok(categorias);
            }
            catch (System.Exception e)
            {
                System.Console.WriteLine(e);
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter categorias.");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<Categoria>> BuscarCategoria(int id) {
            try
            {
                var categoria = await _categoriaService.BuscarCategoria(id);
                if (categoria == null) 
                    return NotFound($"Categoria com o ID: {id} não foi encontrada.");
                return Ok(categoria);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar a categoria.");
            }

        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> CriarCategoria([FromBody] Categoria categoria) {
            try
            {
                await _categoriaService.CriarCategoria(categoria);
                return CreatedAtAction(nameof(ListarCategorias), new { id = categoria.ID}, categoria);
            }
            catch
            {
               return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar a categoria.");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> AtualizarCategoria(int id, [FromBody] Categoria categoria) {
            try
            {
                if (categoria.ID == id) {
                    await _categoriaService.AtualizarCategoria(categoria);
                    return NoContent();
                } else return BadRequest("Dados inconssistentes");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar a categoria.");
            }
        }
    }
}