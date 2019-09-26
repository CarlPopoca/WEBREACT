using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WEBAPICORE_2._2_CONTACTOS.Models;

namespace WEBAPICORE_2._2_CONTACTOS.Models
{
    public class ContactosDBContext:DbContext
    {
        public ContactosDBContext(DbContextOptions<ContactosDBContext> options) : base(options)
        {
        }
        public DbSet<Contactos> Contactos { get; set; }
    }
}
