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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostcard(int id)
        {
            try
            {
                var result = await _postcardRepo.DeletePostcardAsync(id);
                return result ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting postcard: {ex.Message}");
            }
        }
    }
} 