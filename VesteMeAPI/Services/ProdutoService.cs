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
    public class ProdutoService : IProdutoService
    {

        private readonly AplicationDBContext _context;

        public ProdutoService(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Produto>> ListarProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        public async Task<IEnumerable<Produto>> ListarProdutosPorNome(string nomeProduto)
        {
            IEnumerable<Produto> produtos;
            if (!string.IsNullOrWhiteSpace(nomeProduto)) {
                produtos = await _context.Produtos.Where(n => n.Nome.Contains(nomeProduto)).ToListAsync();
            } 
            else 
            {
                produtos = await ListarProdutos();
            }
            return produtos;
        }

        public async Task<IEnumerable<Produto>> ListarProdutosPorCategoria(int idCategoria)
        {
            var produtos = await _context.Produtos.Where(p => p.CategoriaID == idCategoria).ToListAsync();
            return produtos;
        }

        public async Task<IEnumerable<Produto>> ListarProdutosPorTamanho(int idTamanho)
        {
            var produtos = await _context.Produtos.Where(p => p.TamanhoID == idTamanho).ToListAsync();
            return produtos;
        }

        public async Task<Produto> BuscarProduto(int idProduto)
        {
            var produto = await _context.Produtos.FirstOrDefaultAsync(p => p.ID == idProduto);
            return produto;
        }

        public async Task CriarProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarProduto(Produto produto)
        {
            _context.Entry(produto).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        
        public async Task RemoverProduto(Produto produto)
        {
            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
        }
    }
}
