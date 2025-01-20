using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using backend.Models;

public interface IS3Service
{
    Task<List<string>> GetAllFilesFromObjectAsPreSignedUrlsAsync(string locationName);
    Task<List<FileUrl>> GetAllFilesFromObjectAsPreSignedImageAndDownloadUrlsAsync(string locationName);
    Task<Stream> GetFileAsync(string key);
    Task<string> GetPreSignedUrlAsync(string key, int expirationMinutes = 60);
    Task<string> UploadFileAsync(string base64Image, string folderPath);
    Task<List<string>> UploadFileAndGetImageAndDownloadLinksAsync(string filePath, string s3Key);
    Task<bool> DeleteObjectAsync(string key);
    Task<List<string>> ListFilesInFolderAsync(string folderPath);
    Task<string> MoveFileAsync(string sourceKey, string destinationKey);
}
