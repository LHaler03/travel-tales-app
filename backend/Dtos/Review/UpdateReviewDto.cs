using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Review
{
public class UpdateReviewDto
{
    [Required]
    [StringLength(500, ErrorMessage = "Review content must not exceed 500 characters.")]
    public string Comment { get; set; } = string.Empty;

    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    public int Rating { get; set; }
}
}
