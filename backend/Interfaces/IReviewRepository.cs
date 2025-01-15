using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Location;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Interfaces
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviewsByLocationIdAsync(int locationId);
        Task<Review?> GetReviewByIdAsync(int id);
        Task<Review> AddReviewAsync(Review reviewModel);
        Task<Review?> DeleteReviewAsync(int id);
    }
}