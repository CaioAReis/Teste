using System.Collections.Generic;
using System.Threading.Tasks;
using VesteMeAPI.Models;

namespace VesteMeAPI.Services.IServices
{
    public interface ICategoriaService
    {
        Task<IEnumerable<Categoria>> ListarCategorias();
        Task<Categoria> BuscarCategoria(int idCategoria);
        Task CriarCategoria(Categoria categoria);
        Task AtualizarCategoria(Categoria categoria);
    }
}