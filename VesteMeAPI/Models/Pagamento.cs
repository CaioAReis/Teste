using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VesteMeAPI.Models
{
    public class Pagamento
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "A forma de pagamento é obrigatório.", AllowEmptyStrings = false)]
        public string FormaPagamento { get; set; }
    }
}
