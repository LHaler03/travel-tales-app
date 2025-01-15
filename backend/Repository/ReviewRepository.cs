using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Models;
using backend.Data;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDBContext _context;
        public ReviewRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Review>> GetReviewsByLocationIdAsync(int locationId)
        {
            var location = await _context.Locations.FindAsync(locationId);
            if (location == null)
                throw new KeyNotFoundException($"Location with ID {locationId} not found");

            return await _context.Reviews.Where(x => x.LocationId == locationId).Include(x => x.User).ToListAsync();
        }
        public async Task<Review?> GetReviewByIdAsync(int id)
        {
            return await _context.Reviews.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Review> AddReviewAsync(Review reviewModel)
        {
            var location = await _context.Locations.FindAsync(reviewModel.LocationId);
            if (location == null)
                throw new KeyNotFoundException($"Location with ID {reviewModel.LocationId} not found");

            var user = await _context.Users.FindAsync(reviewModel.UserId);
            if (user == null)
                throw new KeyNotFoundException($"User with ID {reviewModel.UserId} not found");

            var existingReview = await _context.Reviews.FirstOrDefaultAsync(r => r.LocationId == reviewModel.LocationId && r.UserId == reviewModel.UserId);

            if (existingReview != null)
                throw new InvalidOperationException("User has already submitted a review for this location!");
                
            reviewModel.Location = location;
            reviewModel.User = user;
            
            await _context.Reviews.AddAsync(reviewModel);
            await _context.SaveChangesAsync();
            
            return reviewModel;
        }

        public async Task<Review?> DeleteReviewAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return null;
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return review;
        }
    }
}