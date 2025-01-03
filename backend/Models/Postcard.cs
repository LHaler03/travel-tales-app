using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Postcard
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ExpiresAt { get; set; }
        [ForeignKey("User")]
        public string? UserId { get; set; }
        public virtual User? User { get; set; }
        public int LocationId { get; set; }
        public Location Location { get; set; } = new Location();
    }
}