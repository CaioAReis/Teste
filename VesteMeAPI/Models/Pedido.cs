using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public decimal ValorTotal { get; set; }

        [DataType(DataType.Date)]
        public DateTime DataEntrega { get; set; }


        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DataPedido { get; set; } = DateTime.UtcNow;

        public virtual ICollection<Produto> Produtos { get; set; }
    }
}
