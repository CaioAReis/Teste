using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using VesteMeAPI.Models;

namespace VesteMeAPI.Services.IServices
{
    public interface IPedidoService
    {
        Task<IEnumerable<Pedido>> ListarPedidos();
        Task<IEnumerable<Pedido>> ListarPedidosDoUsuario(int idUsuario);
        IEnumerable<Produto> ListarProdutosDoPedido(Pedido pedido);
        Task<Pedido> BuscarPedido(int idPedido);
        Task CriarPedido(Pedido pedido);
        Task AtualizarPedido(Pedido pedido);
    }
}