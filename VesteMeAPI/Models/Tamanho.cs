using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VesteMeAPI.Models
{
    public class Tamanho
    {
        [Key]
        public int ID { get; set; }

        [StringLength(100)]
        [Required(ErrorMessage = "Nome do Tamanho é obrigatório.", AllowEmptyStrings = false)]
        public string Nome { get; set; }

        public virtual ICollection<Produto> Produtos { get; set; }
    }
}
