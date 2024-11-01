using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Location;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllAsync();
        Task<Location?> GetByIdAsync(int id);
        Task<Location> CreateAsync(Location locationModel);
        Task<Location?> UpdateAsync(int id, UpdateLocationRequestDto locationDto);
        Task<Location?> DeleteAsync(int id);
    }
}