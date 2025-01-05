using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

public class S3Service : IS3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;

    public S3Service(IAmazonS3 s3Client, string bucketName)
    {
        _s3Client = s3Client;
        _bucketName = bucketName;
    }

    public async Task<List<string>> GetAllFilesFromObjectAsPreSignedUrlsAsync(string locationName)
    {
        var request = new ListObjectsV2Request
        {
            BucketName = _bucketName,
            Prefix = locationName
        };

        var response = await _s3Client.ListObjectsV2Async(request);
        var urls = new List<string>();

        foreach (var obj in response.S3Objects)
        {
            urls.Add(await GetPreSignedUrlAsync(obj.Key));
        }

        return urls;
    }

    public async Task<Stream> GetFileAsync(string key)
    {
        var request = new GetObjectRequest
        {
            BucketName = _bucketName,
            Key = key
        };

        var response = await _s3Client.GetObjectAsync(request);
        return response.ResponseStream;
    }

    public async Task<string> GetPreSignedUrlAsync(string key, int expirationMinutes = 10)
    {
        var request = new GetPreSignedUrlRequest
        {
            BucketName = _bucketName,
            Key = key,
            Expires = DateTime.UtcNow.AddMinutes(expirationMinutes)
        };

        return await Task.FromResult(_s3Client.GetPreSignedURL(request));
    }

    public async Task<string> UploadPostcardAsync(string base64Image, string userId, string locationName)
    {
        try
        {
            if (string.IsNullOrEmpty(base64Image))
                throw new ArgumentException("Image data cannot be empty");

            string base64Data = base64Image;
            if (base64Image.Contains(","))
            {
                base64Data = base64Image.Split(',')[1];
            }

            string fileName = $"{Guid.NewGuid()}.jpg";
            
            string folderPath = string.IsNullOrEmpty(userId) || userId == "anonymous"
                ? "postcards/temporary" 
                : $"postcards/users/{userId}";
            
            string key = $"{folderPath}/{fileName}";

            // Convert base64 to bytes
            byte[] imageBytes = Convert.FromBase64String(base64Data);

            using var stream = new MemoryStream(imageBytes);
            var putRequest = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = key,
                InputStream = stream,
                ContentType = "image/jpeg"
            };

            await _s3Client.PutObjectAsync(putRequest);

            // Set expiration to 1 hour for anonymous uploads, 1 week for registered users
            int expirationMinutes = (userId == "anonymous") ? 60 : 10080;
            
            return await GetPreSignedUrlAsync(key, expirationMinutes);
        }
        catch (AmazonS3Exception ex)
        {
            throw new Exception($"S3 upload failed: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error uploading postcard: {ex.Message}", ex);
        }
    }

    public async Task DeleteObjectAsync(string key)
    {
        var deleteRequest = new DeleteObjectRequest
        {
            BucketName = _bucketName,
            Key = key
        };
        
        await _s3Client.DeleteObjectAsync(deleteRequest);
    }
}
