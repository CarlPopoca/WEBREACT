using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WEBAPICORE_2._2_USUARIOS.Models
{
    public class UsuariosViewModel
    {
        [Key]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmar Password")]
        [Compare("Password",
               ErrorMessage = "El password y la confirmación de password no coinciden")]
        public string ConfirmPassword { get; set; }

    }
}
