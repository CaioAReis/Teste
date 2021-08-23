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
    public class EnderecoService : IEnderecoService
    {
        private readonly AplicationDBContext _context;

        public EnderecoService(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Endereco> BuscarEndereco(int idEndereco)
        {
            var endereco = await _context.Enderecos.FirstOrDefaultAsync(e => e.ID == idEndereco);
            return endereco;
        }

        public async Task CriarEndereco(Endereco endereco)
        {
            _context.Enderecos.Add(endereco);
            await _context.SaveChangesAsync();
        }
        public async Task AtualizarEndereco(Endereco endereco)
        {
            _context.Entry(endereco).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }       
    }
}
