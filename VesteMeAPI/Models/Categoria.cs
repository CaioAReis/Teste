using System.ComponentModel.DataAnnotations;

namespace VesteMeAPI.Models
{
    public class Categoria
    {
        [Key]
        public int ID { get; set; }

        [StringLength(100)]
        [Required(ErrorMessage = "Nome da Categoria é obrigatório.", AllowEmptyStrings = false)]
        public string Nome { get; set; }
    }
}
