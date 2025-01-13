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

    public async Task<string> UploadFileAsync(string base64Image, string folderPath)
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
            
            return await GetPreSignedUrlAsync(key, expirationMinutes: 10);
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

    public async Task<bool> DeleteObjectAsync(string key)
    {
        try
        {
            // First check if object exists
            var getRequest = new GetObjectRequest
            {
                BucketName = _bucketName,
                Key = key
            };

            try
            {
                await _s3Client.GetObjectMetadataAsync(new GetObjectMetadataRequest 
                { 
                    BucketName = _bucketName, 
                    Key = key 
                });
            }
            catch (AmazonS3Exception ex)
            {
                if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                    return false;
                throw;
            }

            // Object exists, proceed with deletion
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = key
            };
            await _s3Client.DeleteObjectAsync(deleteRequest);
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception($"Error deleting object: {ex.Message}", ex);
        }
    }

    public async Task<string> MoveFileAsync(string sourceKey, string destinationKey)
    {
        var copyRequest = new CopyObjectRequest
        {
            SourceBucket = _bucketName,
            SourceKey = sourceKey,
            DestinationBucket = _bucketName,
            DestinationKey = destinationKey
        };

        var deleteRequest = new DeleteObjectRequest
        {
            BucketName = _bucketName,
            Key = sourceKey
        };

        await _s3Client.CopyObjectAsync(copyRequest);
        await _s3Client.DeleteObjectAsync(deleteRequest);

        return await GetPreSignedUrlAsync(destinationKey); // Assuming a method to generate pre-signed URL
    }

    public async Task<List<string>> ListFilesInFolderAsync(string folderPath)
    {
        var files = new List<string>();

        // List objects in the specified folder
        var request = new ListObjectsV2Request
        {
            BucketName = _bucketName,
            Prefix = folderPath
        };
        var response = await _s3Client.ListObjectsV2Async(request);

        foreach (var obj in response.S3Objects)
        {
            files.Add(obj.Key); // Add file key to list
        }

        return files;
    }
}
