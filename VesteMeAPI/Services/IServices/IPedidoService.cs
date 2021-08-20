using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using VesteMeAPI.Models;

namespace VesteMeAPI.Services.IServices
{
    public interface IPedidoService
    {
        Task<IEnumerable<Pedido>> ListasTodosPedidos();
        Task<IEnumerable<Pedido>> ListarTodosPedidosPorData(DateTime data);
        Task<IEnumerable<Pedido>> ListarTodosPedidosDoUsuario(int idUsuario);
        Task<IEnumerable<Pedido>> ListarTodosPedidosDoUsuarioPorData(int idUsuario, DateTime data);
        Task<IEnumerable<Produto>> ListarProdutosDoPedido(int idPedido);
        Task<Pedido> BuscarPedido(int idPedido);
        Task CriarPedido(Pedido pedido);
        Task AtualizarPedido(Pedido pedido);
    }
}