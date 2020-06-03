using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models.DataTransferObjects
{
    public class RegistrationDataObject
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }


        [Required]
        [StringLength(maximumLength: 15, ErrorMessage = "Password must be at least 6 letters long", MinimumLength = 6)]
        public string Password { get; set; }
    }
}
