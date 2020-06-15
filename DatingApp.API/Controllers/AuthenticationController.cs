using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Models;
using DatingApp.API.Models.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationRepository _authRepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthenticationController(IAuthenticationRepository authRepo,
            IConfiguration config, IMapper mapper)
        {
            _authRepo = authRepo;
            _config = config;
            _mapper = mapper;
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

            var userToSave = _mapper.Map<UserModel>(regData);

            var user = await _authRepo.Register(userToSave, regData.Password);

            var userToReturn = _mapper.Map<UserForDetailedViewDataObject>(user);


            return CreatedAtRoute("GetUser", new { Controller = "Users", id = userToReturn.Id }, userToReturn);
        }


        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDataObject loginData)
        {
            var user = await _authRepo.Login(loginData.Username.ToLower(), loginData.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var encryptedKey = _config.GetValue<string>("AppSettings:Token");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(encryptedKey));

            var credentials = new SigningCredentials(securityKey, algorithm: SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token) });

        }


    }
}
