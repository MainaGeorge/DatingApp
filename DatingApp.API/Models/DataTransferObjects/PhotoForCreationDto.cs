using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Models.DataTransferObjects
{
    public class PhotoForCreationDto
    {
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }

        public string PublicId { get; set; }

        public PhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}
