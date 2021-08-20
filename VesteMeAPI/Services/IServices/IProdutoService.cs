using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using VesteMeAPI.Models;

namespace VesteMeAPI.Services.IServices
{
    public interface IProdutoService
    {
        Task<IEnumerable<Produto>> ListarTodosProdutos();
        Task<IEnumerable<Produto>> ListarProdutosPorCategoria(int idCategoria);
        Task<IEnumerable<Produto>> ListarProdutosPorNome(string nomeProduto);
        Task<IEnumerable<Produto>> ListarProdutosPorTamanho(int idTamanho);
        Task<Produto> BuscarProduto(int idProduto);
        Task CriarProduto(Produto produto);
        Task AtualizarProduto(Produto produto);
        Task RemoverProduto(Produto produto);
    }
}