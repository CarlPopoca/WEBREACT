using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace WEBAPICORE_2._2_CONTACTOS.Models
{
    public class ContactosViewModel
    {
        [Key]
        [ScaffoldColumn(false)]
        [DisplayName("Id")]
        public int Id { get; set; }

        [ScaffoldColumn(false)]
        [Display(GroupName = "Contactos")]
        [DisplayName("Nombre")]
        [Required]
        public string Nombre { get; set; }

        [ScaffoldColumn(false)]
        [Display(GroupName = "Contactos")]
        [DisplayName("Celular")]
        [Required]
        public long Celular { get; set; }

        [ScaffoldColumn(false)]
        [Display(GroupName = "Contactos")]
        [DisplayName("Sexo")]
        [Required]
        public string Sexo { get; set; }


    }
}
