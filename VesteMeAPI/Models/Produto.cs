using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VesteMeAPI.Models
{
    public class Produto
    {
        [Key]
        public int ID { get; set; }

        [StringLength(255)]
        [Required(ErrorMessage = "Nome do produto é obrigatório.", AllowEmptyStrings = false)]
        public string Nome { get; set; }

        [StringLength(20000)]
        [Required(ErrorMessage = "Uma descrição é obrigatório.", AllowEmptyStrings = false)]
        public string Descricao { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Valor { get; set; }

        public int QuantidadeEstoque { get; set; }

        [DataType(DataType.DateTime)]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? DataCadastro { get; set; } = DateTime.Now;

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
