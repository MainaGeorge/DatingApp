using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Produces("application/json")]
    [Authorize]

    public class ValuesController : ControllerBase
    {
        private readonly DatingAppContext _context;

        public ValuesController(DatingAppContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var value = await _context.Values.ToListAsync();
            return Ok(value);

        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Value>> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(v => v.Id == id);
            if (value == null)
            {
                return BadRequest();
            }

            return Ok(value);
        }

    }
}

