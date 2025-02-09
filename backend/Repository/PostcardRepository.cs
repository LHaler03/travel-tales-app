using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using backend.Dtos;
using backend.Dtos.Postcard;
using backend.Mappers;

namespace backend.Repository
{
    public class PostcardRepository : IPostcardRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IS3Service _s3Service;
        private readonly ILogger<PostcardRepository> _logger;

        public PostcardRepository(ApplicationDBContext context, IS3Service s3Service, ILogger<PostcardRepository> logger)
        {
            _context = context;
            _s3Service = s3Service;
            _logger = logger;
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
            
            postcard.Location = location;
            await _context.Postcards.AddAsync(postcard);
            await _context.SaveChangesAsync();
            
            return postcard;
        }

        public async Task<bool> DeletePostcardAsync(int id)
        {
            var postcard = await _context.Postcards
                .FirstOrDefaultAsync(p => p.Id == id);
            
            if (postcard == null) return false;

            try
            {
                // Delete from S3 using the stored key
                if (!string.IsNullOrEmpty(postcard.S3Key))
                {
                    await _s3Service.DeleteObjectAsync(postcard.S3Key);
                }

                // Delete from database
                _context.Postcards.Remove(postcard);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete postcard {id}: {ex.Message}");
                throw;
            }
        }
    }
}