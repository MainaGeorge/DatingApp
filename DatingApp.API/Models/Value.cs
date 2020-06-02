using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.API.Models
{
    public class Value
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(16)")]
        public string Name { get; set; }
    }
}
