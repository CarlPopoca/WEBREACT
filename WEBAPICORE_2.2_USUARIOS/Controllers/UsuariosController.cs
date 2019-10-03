using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WEBAPICORE_2._2_USUARIOS.Models;

namespace WEBAPICORE_2._2_USUARIOS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        public UsuariosController(UserManager<IdentityUser> userManager,
                        SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        // POST: api/Usuarios/Ingresar
        [HttpPost]
        public async Task<ActionResult> Ingresar (string email,  LoginViewModel loginViewModel)
        {
            var result = await signInManager.PasswordSignInAsync(email, loginViewModel.Password, loginViewModel.RemenberMe, false);
            if (!result.Succeeded)
            {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/Usuarios/Registrar
        [HttpPost]
        public async Task<ActionResult> Registrar(UsuariosViewModel usuariosViewModel)
        {
            var user = new IdentityUser
            {
                UserName = usuariosViewModel.Email,
                Email = usuariosViewModel.Email
            };

            var result = await userManager.CreateAsync(user, usuariosViewModel.Password);
            if (!result.Succeeded)
            {
                return BadRequest();
            }
            return NoContent();
        }

        // POST: api/Usuarios/CerrarSesion
        [HttpPost]
        public async Task<IActionResult> CerrarSesion()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }
    }
}
