using Amazon.S3.Model;
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

    public S3Controller(IS3Service s3Service)
    {
        _s3Service = s3Service;
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

}
