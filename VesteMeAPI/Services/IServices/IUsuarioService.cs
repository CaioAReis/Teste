using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using VesteMeAPI.Models;

namespace VesteMeAPI.Services.IServices
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> ListarTodosUsuarios();
        Task<Usuario> BuscarUsuario(int idUsario);
        Task<Usuario> BuscarUsuarioPorEmailESenha(string email, string senha);
        Task CriarUsuario(Usuario usuario);
        Task AtualizarUsuario(Usuario usuario);
        Task<bool> UsuarioEAdm(Usuario usuario);
    }
}