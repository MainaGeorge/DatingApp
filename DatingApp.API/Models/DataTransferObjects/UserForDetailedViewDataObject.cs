using System.Collections.Generic;

namespace DatingApp.API.Models.DataTransferObjects
{
    public class UserForDetailedViewDataObject : UserForListDataObject
    {
        public ICollection<PhotoForDetailsDto> Photos { get; set; }
        public string Interests { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }

    }
}
