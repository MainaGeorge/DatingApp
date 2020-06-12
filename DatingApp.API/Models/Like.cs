namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikeeId { get; set; }

        public int LikerId { get; set; }

        public UserModel Liker { get; set; }

        public UserModel Likee { get; set; }

    }
}
