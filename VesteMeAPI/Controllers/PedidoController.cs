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
    public class PedidoController : ControllerBase
    {
        private IPedidoService _pedidoService;

        public PedidoController(IPedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [HttpGet]
        //[Authorize(Roles = "1")]
        public async Task<ActionResult<IAsyncEnumerable<Pedido>>> ListarPedidos()
        {
            try
            {
                var pedidos = await _pedidoService.ListarPedidos();
                return Ok(pedidos);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar pedidos.");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IAsyncEnumerable<Pedido>>> BuscarPedido(int id) 
        {
            try
            {
                var pedido = await _pedidoService.BuscarPedido(id);
                if (pedido != null) return Ok(pedido);
                else return NotFound($"Pedido com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar pedido.");
            }
        }

        [HttpGet("produtos/{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Produto>>> ListarProdutosDoPedido(int id) 
        {
            try
            {
                var pedido = await _pedidoService.BuscarPedido(id);
                if (pedido != null) return Ok(pedido.Produtos);
                else return NotFound($"Pedido com o ID: {id} não foi encontrado.");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao buscar os produtos do pedido.");
            }
        }

        [HttpGet("usuario/{id}")]
        //[Authorize]
        public async Task<ActionResult<IAsyncEnumerator<Pedido>>> ListarPedidosDoUsuario(int id) 
        {
            try
            {
                var pedidos = await _pedidoService.ListarPedidosDoUsuario(id);
                return Ok(pedidos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao listar pedidos do usuário.");
            }
        }

        [HttpPost]
        //[Authorize]
        public async Task<ActionResult> CriarPedido([FromBody] Pedido pedido) 
        {
            try
            {
                await _pedidoService.CriarPedido(pedido);
                return CreatedAtAction(nameof(BuscarPedido), new { id = pedido.ID}, pedido);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao criar pedido.");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult> AtualizarPedido(int id, [FromBody] Pedido pedido)
        {
            try
            {
                if (pedido.ID == id) {
                    await _pedidoService.AtualizarPedido(pedido);
                    return NoContent();
                } else return BadRequest("Dados inconssistentes");   
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao atalizar pedido.");
            }
        }
    }
}