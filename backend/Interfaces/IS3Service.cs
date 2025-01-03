using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

public interface IS3Service
{
    Task<List<string>> GetAllFilesFromObjectAsPreSignedUrlsAsync(string locationName);
    Task<Stream> GetFileAsync(string key);
    Task<string> GetPreSignedUrlAsync(string key, int expirationMinutes = 60);
    Task<string> UploadPostcardAsync(string base64Image, string userId, string locationName);
    Task DeleteObjectAsync(string key);
}
