using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Models.DataTransferObjects
{
    public class RegistrationDataObject
    {
        [Required]
        public string Email { get; set; }

        [Required] 
        public string Gender { get; set; } 

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(maximumLength: 15, ErrorMessage = "Password must be at least 6 letters long", MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string KnownAs { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        public RegistrationDataObject()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}
