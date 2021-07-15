using System;
using System.ComponentModel.DataAnnotations;

namespace VesteMeAPI.Models
{
    public class Usuario
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "Nome do usuário é obrigatório.", AllowEmptyStrings = false)]
        public string Nome { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "CPF é obrigatório", AllowEmptyStrings = false)]
        public string CPF { get; set; }

        [MaxLength(255)]
        [DataType(DataType.EmailAddress)]
        [Required(ErrorMessage = "Email é obrigatório.", AllowEmptyStrings = false)]
        public string Email { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "Senha é obrigatória.", AllowEmptyStrings = false)]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        public string Celular { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        public string Telefone { get; set; }

        public int TipoUsuarioID { get; set; }
        public TipoUsuario TipoUsuario { get; set; }

        public int EnderecoID { get; set; }
        public Endereco Endereco { get; set; }
    }
}
