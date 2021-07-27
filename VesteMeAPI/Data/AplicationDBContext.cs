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
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Pagamento> Pagamentos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Tamanho> Tamanhos { get; set; }
        public DbSet<TipoUsuario> TipoUsuarios { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>()
                .HasData(
                    new { 
                        ID = 1,
                        Nome = "Administrador", 
                        CPF = "000.000.000-00", 
                        Email = "Admin@admin.com.br", 
                        Senha = "Admin@admin.com.br",
                        DataNascimento = DateTime.Today,
                        TipoUsuarioID = 1
                    }
                );

            modelBuilder.Entity<Tamanho>()
                .HasData(
                    new { ID = 1, Nome = "PP" },
                    new { ID = 2, Nome = "P"  },
                    new { ID = 3, Nome = "M"  },
                    new { ID = 4, Nome = "G"  },
                    new { ID = 5, Nome = "GG" }
                );

            modelBuilder.Entity<TipoUsuario>()
                .HasData(
                    new { ID = 1, Tipo = "administrador" },
                    new { ID = 2, Tipo = "cliente" }
                );

            modelBuilder.Entity<Pagamento>()
                .HasData(
                    new { ID = 1, FormaPagamento = "Cartão de crédito"},
                    new { ID = 2, FormaPagamento = "Boleto"}
                );

            modelBuilder.Entity<Categoria>()
                .HasData(
                    new { ID = 1, Nome = "Camisas" },
                    new { ID = 2, Nome = "Camisetas" },
                    new { ID = 3, Nome = "Calças" },
                    new { ID = 4, Nome = "Bermudas e Shorts" },
                    new { ID = 5, Nome = "Blusas" },
                    new { ID = 6, Nome = "Saias" },
                    new { ID = 7, Nome = "Vestidos" },
                    new { ID = 8, Nome = "Casacos" }
                );
        }

    }
}
