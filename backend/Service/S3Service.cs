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
}
