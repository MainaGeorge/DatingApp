using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public class MessagesQueryParameters
    {
        public int PageNumber { get; set; } = 1;

        public int MaxPageSize { get; set; } = 10;

        private int _pageSize = 6;

        public int PageSize
        {
            get => (_pageSize > MaxPageSize) ? MaxPageSize : _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int UserId { get; set; }

        public string MessageContainer { get; set; } = "Unread";
    }
}
