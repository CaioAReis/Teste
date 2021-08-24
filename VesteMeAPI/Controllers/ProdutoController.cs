using System.Collections.Generic;
using System.Linq;
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
    public class ProdutoController : ControllerBase
    {
        private IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IAsyncEnumerable<Produto>>> ListarProdutos()
        {
            try
            {
                var produtos = await _produtoService.ListarProdutos();
                return Ok(produtos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar produtos.");
            }
        }

        [HttpGet("nome")]
        [AllowAnonymous]
        public async Task<ActionResult<IAsyncEnumerable<Produto>>> ListarProdutosPorNome([FromQuery] string nome)
        {
            try
            {
                var produtos = await _produtoService.ListarProdutosPorNome(nome);
                if (produtos.Count() == 0)
                    return NotFound("Nenhum produto foi localizado.");
                return Ok(produtos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar produtos.");
            }
        }

        [HttpGet("categoria/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<IAsyncEnumerable<Produto>>> ListarProdutosPorCategoria(int id)
        {
            try
            {
                var produtos = await _produtoService.ListarProdutosPorCategoria(id);
                return Ok(produtos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar produtos.");
            }
        }

        [HttpGet("tamanho/{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<IAsyncEnumerable<Produto>>> ListarProdutosPorTamanho(int id)
        {
            try
            {
                var produtos = await _produtoService.ListarProdutosPorTamanho(id);
                return Ok(produtos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar produtos.");
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Produto>> BuscarProduto(int id)
        {
            try
            {
                var produto = await _produtoService.BuscarProduto(id);
                if (produto != null) return Ok(produto);
                else return NotFound($"Produto com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar produto.");
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> CriarProduto([FromBody] Produto produto)
        {
            try
            {
                await _produtoService.CriarProduto(produto);
                return CreatedAtAction(nameof(BuscarProduto), new { id = produto.ID}, produto);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar produto.");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> AtualizarProduto(int id, [FromBody] Produto produto)
        {
            try
            {
                if (produto.ID == id) {
                    await _produtoService.AtualizarProduto(produto);
                    return NoContent();
                } else return BadRequest("Dados inconssistentes");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atualizar produto.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> RemoverProduto(int id)
        {
            try
            {
                var produto = await _produtoService.BuscarProduto(id);
                if (produto != null) 
                {
                    await _produtoService.RemoverProduto(produto);
                    return NoContent();
                } 
                else return NotFound("Produto com ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao remover produto.");
            }
        }
    }
}