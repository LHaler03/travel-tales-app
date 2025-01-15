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
                Base64Image = postcard.Base64Image,
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
                Base64Image = dto.Base64Image,
                LocationId = dto.LocationId,
                UserId = dto.UserId
            };
        }
    }
}