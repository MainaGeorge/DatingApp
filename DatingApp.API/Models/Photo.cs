﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string Url { get; set; }

        public UserModel UserModel { get; set; }

        public int UserModelId { get; set; }
    }
}