using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using VesteMeAPI.Models;

namespace VesteMeAPI.Services.IServices
{
    public interface ITamanhoService
    {
        Task<IEnumerable<Tamanho>> ListarTodosTamanhos();
        Task<Tamanho> BuscarTamanho(int idTamanho);
        Task CriarTamanho(Tamanho tamanho);
        Task AtualizarTamanho(Tamanho tamanho);
    }
}