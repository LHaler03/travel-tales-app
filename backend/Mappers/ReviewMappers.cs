using backend.Dtos.Review;
using backend.Models;

namespace backend.Mappers
{
    public static class ReviewMappers
    {
        public static ReviewDto ToReviewDto(this Review reviewModel)
        {
            return new ReviewDto
            {
                Id = reviewModel.Id,
                Comment = reviewModel.Comment,
                Rating = reviewModel.Rating,
                CreatedAt = reviewModel.CreatedAt,
                UpdatedAt = reviewModel.UpdatedAt,
                UserName = reviewModel.User.UserName
            };
        }

        public static Review ToReviewFromCreateDto(this CreateReviewDto reviewDto)
        {
            return new Review
            {
                Comment = reviewDto.Comment,
                Rating = reviewDto.Rating,
                LocationId = reviewDto.LocationId,
                UserId = reviewDto.UserId
            };
        }
    }
}
