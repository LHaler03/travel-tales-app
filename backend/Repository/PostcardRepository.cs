using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class PostcardRepository : IPostcardRepository
    {
        private readonly ApplicationDBContext _context;
        public PostcardRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Postcard>> GetPostcardsByUserIdAsync(string userId)
        {
            return await _context.Postcards
                .Include(p => p.Location)
                .Include(p => p.User)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<Postcard?> GetPostcardByIdAsync(int id)
        {
            return await _context.Postcards
                .Include(p => p.Location)
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Postcard> CreatePostcardAsync(Postcard postcard)
        {
            var location = await _context.Locations.FindAsync(postcard.LocationId);
            if (location == null)
                throw new KeyNotFoundException($"Location with ID {postcard.LocationId} not found");

            if (!string.IsNullOrEmpty(postcard.UserId))
            {
                var user = await _context.Users.FindAsync(postcard.UserId);
                if (user == null)
                    throw new KeyNotFoundException($"User with ID {postcard.UserId} not found");
                
                postcard.User = user;
            }
            else
                postcard.ExpiresAt = DateTime.UtcNow.AddHours(1);
            
            postcard.Location = location;
            await _context.Postcards.AddAsync(postcard);
            await _context.SaveChangesAsync();
            
            return postcard;
        }

        public async Task<bool> DeleteExpiredPostcardsAsync()
        {
            var expiredPostcards = await _context.Postcards
                .Where(p => p.ExpiresAt.HasValue && p.ExpiresAt < DateTime.UtcNow)
                .ToListAsync();

            if (expiredPostcards.Any())
            {
                _context.Postcards.RemoveRange(expiredPostcards);
                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task<bool> DeletePostcardAsync(int id)
        {
            var postcard = await _context.Postcards.FindAsync(id);
            if (postcard == null) return false;

            _context.Postcards.Remove(postcard);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}