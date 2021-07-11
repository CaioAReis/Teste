using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VesteMeAPI.Models;

namespace VesteMeAPI.Data
{
    public class AplicationDBContext : DbContext 
    {
        public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options) { }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Pagamento> Pagamentos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Tamanho> Tamanhos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
