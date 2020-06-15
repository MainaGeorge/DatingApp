using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models.DataTransferObjects
{
    public class MessageToSend
    {
        public int RecipientId { get; set; }
        public int SenderId { get; set; }
        public string Content { get; set; }
        public DateTime DateSent { get; set; }

        public MessageToSend()
        {
            DateSent = DateTime.Now;
        }
    }
}
