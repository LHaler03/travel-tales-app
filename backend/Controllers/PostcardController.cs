using Microsoft.AspNetCore.Mvc;
using backend.Interfaces;
using backend.Dtos.Postcard;
using backend.Mappers;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/postcards")]
    public class PostcardController : ControllerBase
    {
        private readonly IPostcardRepository _postcardRepo;
        private readonly IS3Service _s3Service;
        private readonly ILocationRepository _locationRepo;
        private readonly UserManager<User> _userManager;

        public PostcardController(IPostcardRepository postcardRepo, IS3Service s3Service, ILocationRepository locationRepo, UserManager<User> userManager)
        {
            _postcardRepo = postcardRepo;
            _s3Service = s3Service;
            _locationRepo = locationRepo;
            _userManager = userManager;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserPostcards(string userId)
        {
            var postcards = await _postcardRepo.GetPostcardsByUserIdAsync(userId);
            return Ok(postcards.Select(p => PostcardMapper.ToDto(p)));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostcard(int id)
        {
            var postcard = await _postcardRepo.GetPostcardByIdAsync(id);
            if (postcard == null) return NotFound();
            return Ok(PostcardMapper.ToDto(postcard));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostcard([FromBody] CreatePostcardDto createPostcardDto)
        {
            var location = await _locationRepo.GetByIdAsync(createPostcardDto.LocationId);
            if (location == null)
                return NotFound($"Location {createPostcardDto.LocationId} not found");

            // Validate user exists if userId is provided
            if (!string.IsNullOrEmpty(createPostcardDto.UserId))
            {
                var user = await _userManager.FindByIdAsync(createPostcardDto.UserId);
                if (user == null)
                    return NotFound($"User {createPostcardDto.UserId} not found");
            }

            var postcard = PostcardMapper.ToModel(createPostcardDto);
            postcard.UserId = string.IsNullOrEmpty(createPostcardDto.UserId) ? null : createPostcardDto.UserId;
            
            var imageUrl = await _s3Service.UploadPostcardAsync(
                createPostcardDto.ImageUrl,
                string.IsNullOrEmpty(createPostcardDto.UserId) ? "anonymous" : createPostcardDto.UserId,
                "postcard"
            );
            postcard.ImageUrl = imageUrl;

            await _postcardRepo.CreatePostcardAsync(postcard);
            return Ok(PostcardMapper.ToDto(postcard));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostcard(int id)
        {
            var result = await _postcardRepo.DeletePostcardAsync(id);
            return result ? NoContent() : NotFound();
        }
    }
} 