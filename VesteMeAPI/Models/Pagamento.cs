using System.ComponentModel.DataAnnotations;

namespace VesteMeAPI.Models
{
    public class Pagamento
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "A forma de pagamento é obrigatória.", AllowEmptyStrings = false)]
        public string FormaPagamento { get; set; }
    }
}
