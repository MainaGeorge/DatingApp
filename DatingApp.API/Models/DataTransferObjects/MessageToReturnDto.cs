﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models.DataTransferObjects
{
    public class MessageToReturnDto
    {
        public int Id { get; set; }
        public int RecipientId { get; set; }
        public string RecipientKnownAs { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public int SenderId { get; set; }
        public string SenderKnownAs { get; set; }
        public string SenderPhotoUrl { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime DateSent { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
    }
}