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
    public class TamanhoService : ITamanhoService
    {

        private readonly AplicationDBContext _context;

        public TamanhoService(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tamanho>> ListarTamanhos()
        {
            return await _context.Tamanhos.ToListAsync();
        }

        public async Task<Tamanho> BuscarTamanho(int idTamanho)
        {
            var tamanho = await _context.Tamanhos.FirstOrDefaultAsync(t => t.ID == idTamanho);
            return tamanho;
        }

        public async Task CriarTamanho(Tamanho tamanho)
        {
            _context.Tamanhos.Add(tamanho);
            await _context.SaveChangesAsync();
        }

        public async Task AtualizarTamanho(Tamanho tamanho)
        {
            _context.Entry(tamanho).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
