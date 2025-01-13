using Amazon.S3.Model;
using backend.Controllers;
using backend.Data;
using backend.Dtos.Postcard;
using backend.Mappers;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

[Route("api/s3")]
[ApiController]
public class S3Controller : ControllerBase
{
    private readonly IS3Service _s3Service;
    private readonly PostcardRepository _postcardRepo;
    private ApplicationDBContext _context;

    public S3Controller(IS3Service s3Service, PostcardRepository postcardRepo, ApplicationDBContext context)
    {
        _s3Service = s3Service;
        _postcardRepo = postcardRepo;
        _context = context;
    }

    [HttpGet("{locationName}")]
    public async Task<List<string>> ListFilesAsync(string locationName)
    {
        var key = $"valid/{locationName}";
        return await _s3Service.GetAllFilesFromObjectAsPreSignedUrlsAsync(key);
    }

    [HttpGet("file")]
    public async Task<IActionResult> GetFile([FromQuery] string key)
    {
        var stream = await _s3Service.GetFileAsync(key);
        return File(stream, "image/jpeg");
    }

    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImages([FromBody] UploadImagesRequest request)
    {
        try
        {
            if (request.Images == null || request.Images.Count == 0 || request.Images.Count > 2)
                return BadRequest("You must upload at least one image and at most two images");
            if (string.IsNullOrEmpty(request.UserId) && request.ReviewRequired == true)
                return BadRequest("User ID is required for review");

            var urls = new List<string>();
            foreach (var image in request.Images)
            {
                string folderPath;

                if (string.IsNullOrEmpty(request.UserId)) // anonymous user
                {
                    folderPath = "temporary";
                    var url = await _s3Service.UploadFileAsync(image, folderPath);
                    urls.Add(url);
                }
                else if (request.ReviewRequired) // review required
                {
                    var user = await _context.Users.FindAsync(request.UserId);
                    if (user == null)
                        throw new KeyNotFoundException($"User {request.UserId} not found");

                    var reviewFolderPath = $"images/review/{request.UserId}";
                    var reviewUrl = await _s3Service.UploadFileAsync(image, reviewFolderPath);
                    
                    var userFolderPath = $"images/users/{request.UserId}";
                    var userUrl = await _s3Service.UploadFileAsync(image, userFolderPath);

                    urls.Add(userUrl);
                }
                else // review not required
                {
                    var user = await _context.Users.FindAsync(request.UserId);
                    if (user == null)
                        throw new KeyNotFoundException($"User {request.UserId} not found");
                    folderPath = $"images/users/{request.UserId}";
                    var url = await _s3Service.UploadFileAsync(image, folderPath);
                    urls.Add(url);
                }
            }
            return Ok(new { Message = "Images uploaded successfully", Urls = urls });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("upload-postcard")]
    public async Task<IActionResult> UploadPostcard([FromBody] CreatePostcardDto request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.Base64Image) || request.LocationId <= 0)
                return BadRequest("Invalid request");
            if (string.IsNullOrEmpty(request.UserId) && request.SavePostcard == true)
                return BadRequest("Anonymous users can't save their postcards. Please login or register.");

            string folderPath;

            if (string.IsNullOrEmpty(request.UserId))
            {
                folderPath = "temporary";
            } else
            {
                var user = await _context.Users.FindAsync(request.UserId);
                if (user == null)
                    throw new KeyNotFoundException($"User {request.UserId} not found");
                folderPath = request.SavePostcard
                    ? $"postcards/users/{request.UserId}"
                    : "temporary";
            }
            
            var url = await _s3Service.UploadFileAsync(request.Base64Image, folderPath);
            
            request.Base64Image = url; // Set the URL for the uploaded postcard image
            var createResult = await _postcardRepo.CreatePostcardAsync(request);

            // Return success response with the postcard creation result
            return Ok(new { Message = "Postcard uploaded and created successfully", Postcard = PostcardMapper.ToDto(createResult) });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = ex.Message });
        }
    }
}
