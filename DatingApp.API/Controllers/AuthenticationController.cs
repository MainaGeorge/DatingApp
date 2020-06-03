using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using DatingApp.API.Models.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationRepository _authRepo;

        public AuthenticationController(IAuthenticationRepository authRepo)
        {
            _authRepo = authRepo;
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistrationDataObject regData)
        {
            regData.Username = regData.Username.ToLower();

            if (await _authRepo.UsernameExists(regData.Username))
            {
                return BadRequest("username already exists");
            }

            if (await _authRepo.EmailExists(regData.Email))
            {
                return BadRequest("this email is already taken");
            }

            var userToSave = new UserModel
            {
                Username = regData.Username,
                Email = regData.Email
            };

            var user = await _authRepo.Register(userToSave, regData.Password);


            return StatusCode(201);
        }


    }
}
