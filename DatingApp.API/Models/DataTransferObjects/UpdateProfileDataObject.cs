using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models.DataTransferObjects
{
    public class UpdateProfileDataObject
    {
        public string Introduction { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
    }
}
