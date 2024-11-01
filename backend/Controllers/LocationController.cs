using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Location;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Route("api/locations")]
  public class LocationController(ApplicationDBContext context) : ControllerBase
  {
    private readonly ApplicationDBContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var locations = await _context.Locations.ToListAsync();

      return Ok(locations);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var location = await _context.Locations.FindAsync(id);

      if (location == null) return NotFound();

      return Ok(location);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLocationRequestDto locationDto)
    {
      var locationModel = locationDto.ToLocationFromCreateDTO();

      await _context.Locations.AddAsync(locationModel);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetById), new { id = locationModel.Id }, locationModel);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateLocationRequestDto updateLocationDto)
    {
      var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);

      if (locationModel == null) return NotFound();

      locationModel.Name = updateLocationDto.Name;
      locationModel.Country = updateLocationDto.Country;
      locationModel.Lat = updateLocationDto.Lat;
      locationModel.Lon = updateLocationDto.Lon;

      await _context.SaveChangesAsync();

      return Ok(locationModel);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);

      if (locationModel == null) return NotFound();

      _context.Locations.Remove(locationModel);

      await _context.SaveChangesAsync();

      return NoContent();
    }

  }
}
