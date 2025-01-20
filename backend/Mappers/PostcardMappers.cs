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
                S3Key = postcard.S3Key,
                CreatedAt = postcard.CreatedAt,
                UserName = postcard.User?.UserName ?? string.Empty,
                LocationName = postcard.Location.Name
            };
        }

/*        public static Postcard ToModel(CreatePostcardDto dto)
        {
            return new Postcard
            {
                S3Key = dto.S3Key,
                LocationId = dto.LocationId,
                UserId = dto.UserId
            };
        }
    }
*/
}
}