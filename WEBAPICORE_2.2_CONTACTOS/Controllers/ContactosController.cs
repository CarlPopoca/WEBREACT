using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WEBAPICORE_2._2_CONTACTOS.Models;

namespace WEBAPICORE_2._2_CONTACTOS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactosController : ControllerBase
    {
        private readonly ContactosDBContext _context;

        public ContactosController(ContactosDBContext context)
        {
            _context = context;
        }

        // GET: api/Contactos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactosViewModel>>> GetContactos()
        {
            var list = new List<ContactosViewModel>();
            var contactos = await _context.Contactos.ToListAsync();
            list.AddRange(contactos.Select(item => new ContactosViewModel {
                Id = item.Id,
                Nombre = item.Nombre,
                Celular = item.Celular,
                Sexo = item.Sexo
            }));

            return list;
        }

        // GET: api/Contactos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactosViewModel>> GetContactos(int id)
        {
            var contactos = await _context.Contactos.FindAsync(id);

            if (contactos == null)
            {
                return NotFound();
            }

            return new ContactosViewModel {
                Id = contactos.Id,
                Nombre = contactos.Nombre,
                Celular = contactos.Celular,
                Sexo = contactos.Sexo
                };
        }

        // PUT: api/Contactos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactos(int id, ContactosViewModel contactosViewModel)
        {
            if (id != contactosViewModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(new Contactos {
                Id = id,
                Nombre = contactosViewModel.Nombre,
                Celular = contactosViewModel.Celular,
                Sexo = contactosViewModel.Sexo
            }).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Contactos
        [HttpPost]
        public async Task<ActionResult<ContactosViewModel>> PostContactos(ContactosViewModel contactosViewModel)
        {
            var contacto =  new Contactos
            {
                Id = contactosViewModel.Id,
                Nombre = contactosViewModel.Nombre,
                Celular = contactosViewModel.Celular,
                Sexo = contactosViewModel.Sexo
            };
            _context.Contactos.Add(contacto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContactos", new { id = contacto.Id }, contacto);
        }

        // DELETE: api/Contactos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ContactosViewModel>> DeleteContactos(int id)
        {
            var contactos = await _context.Contactos.FindAsync(id);
            if (contactos == null)
            {
                return NotFound();
            }

            _context.Contactos.Remove(contactos);
            await _context.SaveChangesAsync();

            return  new ContactosViewModel
            {
                Id = contactos.Id,
                Nombre = contactos.Nombre,
                Celular = contactos.Celular,
                Sexo = contactos.Sexo
            };
        }

        private bool ContactosExists(int id)
        {
            return _context.Contactos.Any(e => e.Id == id);
        }
    }
}
