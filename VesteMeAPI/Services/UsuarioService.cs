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
    public class UsuarioService : IUsuarioService
    {

        private readonly AplicationDBContext _context;

        public UsuarioService(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Usuario>> ListarUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario> BuscarUsuario(int idUsario)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(usu => usu.ID == idUsario);
            return usuario;
        }

        public async Task<Usuario> BuscarUsuarioPorEmailESenha(string email, string senha)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(usu => usu.Email.Equals(email) && usu.Senha.Equals(senha));
            return usuario;            
        }

        public async Task CriarUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarUsuario(Usuario usuario)
        {
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
