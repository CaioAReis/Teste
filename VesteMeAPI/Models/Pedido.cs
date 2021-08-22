using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace VesteMeAPI.Models
{
    public class Pedido
    {
        [Key]
        public int ID { get; set; }

        public int UsuarioID { get; set; }
        public Usuario Usuario { get; set; }

        public int PagamentoID { get; set; }
        public Pagamento Pagamento { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "O status do pedido é obrigatório", AllowEmptyStrings = false)]
        public string Status { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal ValorTotal { get; set; }

        [DataType(DataType.Date)]
        public DateTime DataEntrega { get; set; }

        [DataType(DataType.Date)]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? DataPedido { get; set; } = DateTime.Now;

        public virtual ICollection<Produto> Produtos { get; set; }
    }
}
