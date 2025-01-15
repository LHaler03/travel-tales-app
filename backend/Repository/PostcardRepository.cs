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
            else
                postcard.ExpiresAt = DateTime.UtcNow.AddHours(24);
            
            postcard.Location = location;
            await _context.Postcards.AddAsync(postcard);
            await _context.SaveChangesAsync();
            
            return postcard;
        }

        public async Task<bool> DeleteExpiredPostcardsAsync()
        {
            try 
            {
                var expiredPostcards = await _context.Postcards
                    .Where(p => p.ExpiresAt.HasValue && p.ExpiresAt < DateTime.UtcNow)
                    .ToListAsync();

                if (expiredPostcards.Any())
                {
                    foreach (var postcard in expiredPostcards)
                    {
                        try
                        {
                            var uri = new Uri(postcard.Base64Image);
                            var key = uri.AbsolutePath.TrimStart('/');
                            await _s3Service.DeleteObjectAsync(key);
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError($"Failed to delete S3 object for postcard {postcard.Id}: {ex.Message}");
                        }
                    }

                    _context.Postcards.RemoveRange(expiredPostcards);
                    await _context.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete expired postcards: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> DeletePostcardAsync(int id)
        {
            var postcard = await _context.Postcards.FindAsync(id);
            if (postcard == null) return false;

            try
            {
                var uri = new Uri(postcard.Base64Image);
                var key = uri.AbsolutePath.TrimStart('/');
                await _s3Service.DeleteObjectAsync(key);
                _context.Postcards.Remove(postcard);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete postcard {id}: {ex.Message}");
                throw; // Re-throw to let the controller handle the error
            }
        }

        public async Task<Postcard?> CreatePostcardAsync(CreatePostcardDto createPostcardDto)
        {
            // Validate location existence
            var location = await _context.Locations.FindAsync(createPostcardDto.LocationId);
            if (location == null)
                throw new KeyNotFoundException($"Location {createPostcardDto.LocationId} not found");

            // Validate user existence if UserId is provided
            if (!string.IsNullOrEmpty(createPostcardDto.UserId))
            {
                var user = await _context.Users.FindAsync(createPostcardDto.UserId);
                if (user == null)
                    throw new KeyNotFoundException($"User {createPostcardDto.UserId} not found");
            }

            // Map DTO to Postcard model
            var postcard = PostcardMapper.ToModel(createPostcardDto);
            postcard.UserId = string.IsNullOrEmpty(createPostcardDto.UserId) ? null : createPostcardDto.UserId;

            postcard.Location = location;

            // Handle postcard expiration
            if (string.IsNullOrEmpty(postcard.UserId) || createPostcardDto.SavePostcard == false)
                postcard.ExpiresAt = DateTime.UtcNow.AddHours(24);

            // Save postcard
            await _context.Postcards.AddAsync(postcard);
            await _context.SaveChangesAsync();

            return postcard;
        }

    }
}