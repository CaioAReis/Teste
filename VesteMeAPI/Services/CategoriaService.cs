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
    public class CategoriaService : ICategoriaService
    {

        private readonly AplicationDBContext _context;

        public CategoriaService(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Categoria>> ListarCategorias()
        {
            return await _context.Categorias.ToListAsync();
        }

        public async Task<Categoria> BuscarCategoria(int idCategoria)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.ID == idCategoria);
            return categoria;
        }

        public async Task CriarCategoria(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarCategoria(Categoria categoria)
        {
            _context.Entry(categoria).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
