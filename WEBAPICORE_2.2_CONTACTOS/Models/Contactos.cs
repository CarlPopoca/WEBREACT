using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WEBAPICORE_2._2_CONTACTOS.Models
{
    public class Contactos
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Nombre { get; set; }
        [Required]
        [Column(TypeName = "bigint")]
        public long Celular { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(3)")]
        public string Sexo { get; set; }
 
    }
}
