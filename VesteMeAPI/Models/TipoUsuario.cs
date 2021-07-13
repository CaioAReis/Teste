using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VesteMeAPI.Models
{
    public class TipoUsuario
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(15)]
        [Required]
        public string Tipo { get; set; }

        public ICollection<Usuario> Usuarios { get; set; }
    }
}
