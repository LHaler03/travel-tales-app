using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

public interface IS3Service
{
    Task<List<string>> GetAllFilesFromObjectAsPreSignedUrlsAsync(string locationName);
    Task<Stream> GetFileAsync(string key);
    Task<string> GetPreSignedUrlAsync(string key, int expirationMinutes = 60);
}
