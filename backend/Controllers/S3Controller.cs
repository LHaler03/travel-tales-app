using Amazon.S3.Model;
using backend.Controllers;
using backend.Data;
using backend.Dtos.Postcard;
using backend.Mappers;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
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
            var location = await _context.Locations.FindAsync(request.LocationId);
            if (location == null)
                throw new KeyNotFoundException($"Location with ID {request.LocationId} not found");

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

                    var reviewFolderPath = $"images/review/{request.LocationId}";
                    var reviewUrl = await _s3Service.UploadFileAsync(image, reviewFolderPath);

                    var userFolderPath = $"images/users/{request.UserId}/{location.Name}";
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
            }
            else
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

    [HttpGet("images-to-review")]
    // [Authorize (Roles = "Admin")]
    public async Task<IActionResult> GetImagesToReview()
    {
        var imagesToReview = await _s3Service.ListFilesInFolderAsync("images/review");
        var imagesToReviewLinks = await _s3Service.GetAllFilesFromObjectAsPreSignedUrlsAsync("images/review");
        var imagePairs = imagesToReview.Zip(imagesToReviewLinks, (image, link) => new { ImageName = image, ImageUrl = link });
        return Ok(imagePairs);
    }

    // [Authorize(Roles = "Admin")]
    [HttpPost("approve-image")]
    public async Task<IActionResult> ApproveImage([FromBody] ApproveRejectImageRequest request)
    {
        try
        {
            var cityName = _context.Locations.FirstOrDefault(location => location.Id == request.LocationId)?.Name;
            if (cityName == null)
                return BadRequest("Invalid location ID");

            var imageKey = request.ImageName;
            var validFolderPath = $"valid/{cityName}/{request.ImageName}.jpg";

            var url = await _s3Service.MoveFileAsync(imageKey, validFolderPath);
            return Ok(new { Message = "Image approved", Url = url });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [Authorize(Roles = "Admin")]
    [HttpPost("reject-image")]
    public async Task<IActionResult> RejectImage([FromBody] ApproveRejectImageRequest request)
    {
        try
        {
            var imageKey = request.ImageName;
            var success = await _s3Service.DeleteObjectAsync(imageKey);

            return success
                ? Ok(new { Message = "Image rejected" })
                : NotFound(new { Message = "Image not found" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}
