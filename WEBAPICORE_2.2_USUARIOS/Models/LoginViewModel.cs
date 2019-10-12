using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WEBAPICORE_2._2_USUARIOS.Models
{
    public class LoginViewModel
    {
        [Required]
   
        public string Email { get; set; }

        [Required]
       
        public string Password { get; set; }
        public bool RemenberMe { get; set; }
    }
}
