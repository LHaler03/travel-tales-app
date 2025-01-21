using Amazon.S3.Model;
using backend.Controllers;
using backend.Data;
using backend.Dtos.Postcard;
using backend.Mappers;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Diagnostics;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using Newtonsoft.Json;


[Route("api/s3")]
[ApiController]
public class S3Controller : ControllerBase
{
    private readonly IS3Service _s3Service;
    private readonly PostcardRepository _postcardRepo;
    private readonly ApplicationDBContext _context;
    private readonly string _remotionProjectPath;
    private static readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1, 1);

    public S3Controller(IS3Service s3Service, PostcardRepository postcardRepo, ApplicationDBContext context, IConfiguration configuration)
    {
        _s3Service = s3Service;
        _postcardRepo = postcardRepo;
        _context = context;
        _remotionProjectPath = configuration["RemotionProjectPath"];
    }

    [HttpGet("{locationName}")]
    public async Task<List<string>> ListFilesAsync(string locationName)
    {
        var key = $"valid/{locationName}";
        return await _s3Service.GetAllFilesFromObjectAsPreSignedUrlsAsync(key);
    }

    [HttpGet("postcards/{userId}")]
    public async Task<List<FileUrl>> ListUserPostcardsAsync(string userId)
    {
        var key = $"postcards/{userId}";
        return await _s3Service.GetAllFilesFromObjectAsPreSignedImageAndDownloadUrlsAsync(key);
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

    [HttpPost("generate-postcard")]
    public async Task<IActionResult> GeneratePostcard([FromBody] PostcardProps request)
    {
        var user = await _context.Users.FindAsync(request.UserId);
        try
        {
            if (request.LocationId <= 0)
                return BadRequest("Invalid request");

            string folderPath;
            string s3Key;

            if (string.IsNullOrEmpty(request.UserId))
            {
                folderPath = "temporary";
                s3Key = $"{folderPath}/{Guid.NewGuid()}.jpg";
            }
            else
            {
                var location = await _context.Locations.FindAsync(request.LocationId);
                if (user == null || location == null)
                    throw new KeyNotFoundException($"User {request.UserId} or location not found");

                folderPath = $"postcards/{request.UserId}/{location.Name}";
                s3Key = $"{folderPath}/{Guid.NewGuid()}.jpg";

                // Create postcard record with the same S3 key that will be used for upload
                await _postcardRepo.CreatePostcardAsync(new Postcard
                {
                    UserId = request.UserId,
                    LocationId = request.LocationId,
                    S3Key = s3Key
                });
            }

            var props = new { city = request.City, titleColor = request.TitleColor, fromText = request.FromText, fromColor = request.FromColor, borderColor = request.BorderColor, link1 = request.Link1, link2 = request.Link2 };
            var propsJson = JsonConvert.SerializeObject(props);
            propsJson = propsJson.Replace("\"", "\\\"");

            await RunYarnScriptAsync(request.Component, propsJson);

            // Pass the specific S3 key to use
            var links = await _s3Service.UploadFileAndGetImageAndDownloadLinksAsync(
                $"../frontend/out/{request.Component}.png",
                s3Key
            );

            Console.WriteLine("GENERIRANA SLIKA");

            return Ok(new { Message = "Postcard uploaded and created successfully", imageLink = links[0], downloadLink = links[1] });
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
    // [Authorize(Roles = "Admin")]
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

    private async Task RunYarnScriptAsync(string composition, string props)
    {

        await _semaphore.WaitAsync();

        try
        {
            var directory = _remotionProjectPath;

            string scriptName = "render";
            var processStartInfo = new ProcessStartInfo
            {
                FileName = "/bin/zsh",
                Arguments = $"-c \"cd {directory} && yarn {scriptName} {composition} --props='{props}'\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using (var process = new Process { StartInfo = processStartInfo })
            {
                process.Start();

                var outputTask = process.StandardOutput.ReadToEndAsync();
                var errorTask = process.StandardError.ReadToEndAsync();

                await Task.WhenAll(outputTask, errorTask);

                process.WaitForExit();

                if (process.ExitCode != 0)
                {
                    throw new Exception($"Error running yarn script: {await errorTask}");
                }

                Console.WriteLine(await outputTask);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
        finally
        {
            _semaphore.Release();
        }
    }

}
