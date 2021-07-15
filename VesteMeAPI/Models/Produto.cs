using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VesteMeAPI.Models
{
    public class Produto
    {
        [Key]
        public int ID { get; set; }

        [StringLength(255)]
        [Required(ErrorMessage = "Nome do produto é obrigatório.", AllowEmptyStrings = false)]
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$", ErrorMessage = "Números e caracteres especiais não são permitidos.")]
        public string Nome { get; set; }

        [StringLength(20000)]
        [Required(ErrorMessage = "Uma descrição é obrigatório.", AllowEmptyStrings = false)]
        public string Descricao { get; set; }

        public decimal Valor { get; set; }

        public int QuantidadeEstoque { get; set; }

        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DataAlteracao { get; set; }

        public int CategoriaID { get; set; }
        public  Categoria Categoria { get; set; }

        public int TamanhoID { get; set; }
        [NotMapped]
        public Tamanho Tamanho { get; set; }
        public virtual ICollection<Tamanho> Tamanhos { get; set; }

        public virtual ICollection<Pedido> Pedidos { get; set; }
    }
}
