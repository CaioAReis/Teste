using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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

        public DateTime DataEntrega { get; set; }

        public DateTime DataPedido { get; set; }

        public virtual ICollection<Produto> Produtos { get; set; }
    }
}
