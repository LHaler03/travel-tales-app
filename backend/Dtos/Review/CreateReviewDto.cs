using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Review
{
    public class CreateReviewDto
    {
        [Required]
        [StringLength(500)]
        public string Comment { get; set; } = string.Empty;
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }
        [Required]
        public int LocationId { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;
    }
}