using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        [Required]
        public string Comment { get; set; } = string.Empty;
        [Range(1, 5)]
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int LocationId { get; set; }
        public Location Location { get; set; } = new Location();

        public string UserId { get; set; } = string.Empty;
        public User User { get; set; } = new User();
    }
}