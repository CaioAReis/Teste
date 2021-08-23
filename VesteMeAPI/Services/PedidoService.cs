using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VesteMeAPI.Data;
using VesteMeAPI.Models;
using VesteMeAPI.Services.IServices;

namespace VesteMeAPI.Services
{
    public class PedidoService : IPedidoService
    {

        private readonly AplicationDBContext _context;

        public PedidoService(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pedido>> ListarPedidos()
        {
            return await _context.Pedidos.ToListAsync();
        }

        public async Task<Pedido> BuscarPedido(int idPedido)
        {
            var pedido = await _context.Pedidos.FirstOrDefaultAsync(p => p.ID == idPedido);
            return pedido;
        }

        public IEnumerable<Produto> ListarProdutosDoPedido(Pedido pedido)
        {
            return pedido.Produtos.ToList();
        }

        public async Task<IEnumerable<Pedido>> ListarPedidosDoUsuario(int idUsuario)
        {
            return await _context.Pedidos.Where(p => p.UsuarioID == idUsuario).ToListAsync();
        }

        public async Task CriarPedido(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();
        } 

        public async Task AtualizarPedido(Pedido pedido)
        {
            _context.Entry(pedido).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
