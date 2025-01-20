using System.Threading.Tasks;
using backend.Models;
using backend.Dtos.Postcard;

namespace backend.Interfaces
{
    public interface IPostcardRepository
    {
        Task<IEnumerable<Postcard>> GetPostcardsByUserIdAsync(string userId);
        Task<Postcard?> GetPostcardByIdAsync(int id);
        Task<bool> DeletePostcardAsync(int id);
        Task<Postcard> CreatePostcardAsync(Postcard postcard);
    }
}