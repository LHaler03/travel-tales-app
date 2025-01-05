using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IPostcardRepository
{
    Task<IEnumerable<Postcard>> GetPostcardsByUserIdAsync(string userId);
    Task<Postcard?> GetPostcardByIdAsync(int id);
    Task<Postcard> CreatePostcardAsync(Postcard postcard);
    Task<bool> DeleteExpiredPostcardsAsync();
    Task<bool> DeletePostcardAsync(int id);
}
}