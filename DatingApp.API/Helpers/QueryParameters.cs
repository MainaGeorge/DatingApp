namespace DatingApp.API.Helpers
{
    public class QueryParameters
    {
        public int PageNumber { get; set; } = 1;

        public int MaxPageSize { get; set; } = 10;


        private int _pageSize = 10;

        public int PageSize
        {
            get => (_pageSize > MaxPageSize) ? MaxPageSize : _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

    }
}
