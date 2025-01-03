using backend.Dtos.Postcard;
using backend.Models;

namespace backend.Mappers
{
    public static class PostcardMapper
    {
        public static PostcardDto ToDto(Postcard postcard)
        {
            return new PostcardDto
            {
                Id = postcard.Id,
                ImageUrl = postcard.ImageUrl,
                CreatedAt = postcard.CreatedAt,
                ExpiresAt = postcard.ExpiresAt,
                UserName = postcard.User?.UserName ?? string.Empty,
                LocationName = postcard.Location.Name
            };
        }

        public static Postcard ToModel(CreatePostcardDto dto)
        {
            return new Postcard
            {
                ImageUrl = dto.ImageUrl,
                LocationId = dto.LocationId,
                UserId = dto.UserId
            };
        }
    }
}