using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VesteMeAPI.Models
{
    public class UsuarioDTO
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(255)]
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$", ErrorMessage = "Números e caracteres especiais não são permitidos.")]
        public string Nome { get; set; }

        [MaxLength(50)]
        public string CPF { get; set; }

        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; }

        [MaxLength(255)]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        public string Celular { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        public string Telefone { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? TipoUsuarioID { get; set; } = 2;
        public TipoUsuario TipoUsuario { get; set; }

        public int? EnderecoID { get; set; }
        public Endereco Endereco { get; set; }
    }
}
