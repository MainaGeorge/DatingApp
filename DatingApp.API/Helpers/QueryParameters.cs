namespace DatingApp.API.Helpers
{
    public class QueryParameters
    {
        public int PageNumber { get; set; } = 1;

        public int MaxPageSize { get; set; } = 10;

        public int MaxAge { get; set; } = 99;
        public int MinAge { get; set; } = 18;

        private int _pageSize = 6;

        public int PageSize
        {
            get => (_pageSize > MaxPageSize) ? MaxPageSize : _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int UserId { get; set; }
        public string Gender { get; set; }
    }
}
