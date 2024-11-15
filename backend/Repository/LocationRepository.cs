using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Location;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class LocationRepository(ApplicationDBContext context) : ILocationRepository
    {

        private readonly ApplicationDBContext _context = context;

        public async Task<List<Location>> GetAllAsync()
        {
            return await _context.Locations.ToListAsync();
        }

        public async Task<Location?> GetByIdAsync(int id)
        {
            return await _context.Locations.FindAsync(id);
        }

        public async Task<Location> CreateAsync(Location locationModel)
        {
            await _context.Locations.AddAsync(locationModel);
            await _context.SaveChangesAsync();

            return locationModel;
        }

        public async Task<Location?> UpdateAsync(int id, UpdateLocationRequestDto locationDto)
        {
            var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);

            if (locationModel == null) return null;

            locationModel.Name = locationDto.Name;
            locationModel.Country = locationDto.Country;
            locationModel.Lat = locationDto.Lat;
            locationModel.Lon = locationDto.Lon;

            await _context.SaveChangesAsync();

            return locationModel;
        }

        public async Task<Location?> DeleteAsync(int id)
        {
            var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);

            if (locationModel == null) return null;

            _context.Locations.Remove(locationModel);
            await _context.SaveChangesAsync();

            return locationModel;
        }

    }
}