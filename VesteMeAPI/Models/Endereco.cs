using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VesteMeAPI.Models
{
    public class Endereco
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "Nome do Estado é obrigatório.", AllowEmptyStrings = false)]
        public string Estado { get; set; }

        [MaxLength(15)]
        [Required(ErrorMessage = "CEP é obrigatório.", AllowEmptyStrings = false)]
        public string CEP { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "Nome da Cidade é obrigatório.", AllowEmptyStrings = false)]
        public string Cidade { get; set; }

        [MaxLength(500)]
        [Required(ErrorMessage = "Nome do Bairro é obrigatório.", AllowEmptyStrings = false)]
        public string Bairro { get; set; }

        [MaxLength(500)]
        public string Complemento { get; set; }

        [MaxLength(500)]
        [Required(ErrorMessage = "Nome da Rua é obrigatório.", AllowEmptyStrings = false)]
        public string Rua { get; set; }

        [Required(ErrorMessage = "Número da casa é obrigatório.")]
        public int Numero { get; set; }
    }
}
