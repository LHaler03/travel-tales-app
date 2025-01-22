using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Location;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Route("api/locations")]
  [ApiController]
  public class LocationController : ControllerBase
  {
    private readonly ApplicationDBContext _context;
    private readonly ILocationRepository _locationRepo;

    public LocationController(ApplicationDBContext context, ILocationRepository locationRepo)
    {
      _context = context;
      _locationRepo = locationRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var locations = await _locationRepo.GetAllAsync();

      return locations != null ? Ok(locations) : NotFound();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var location = await _locationRepo.GetByIdAsync(id);

      return location != null ? Ok(location) : NotFound();
    }

    [HttpPost("add-location")]
    public async Task<IActionResult> Create([FromBody] CreateLocationRequestDto locationDto)
    {
      var existingLocation = (await _locationRepo.GetAllAsync())
          .FirstOrDefault(l => (l.Name == locationDto.Name && l.Country == locationDto.Country) ||
                               (Math.Abs(l.Lat - locationDto.Lat) < 0.001m &&
                                Math.Abs(l.Lon - locationDto.Lon) < 0.001m));

      if (existingLocation != null)
        return Forbid("Location too close to an existing one.");

      var locationModel = await _locationRepo.CreateAsync(locationDto.ToLocationFromCreateDTO());

      return CreatedAtAction(nameof(GetById), new { id = locationModel.Id }, locationModel);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateLocationRequestDto updateLocationDto)
    {
      var locationModel = await _locationRepo.UpdateAsync(id, updateLocationDto);

      return locationModel != null ? Ok(locationModel) : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var locationModel = await _locationRepo.DeleteAsync(id);

      return locationModel != null ? NoContent() : NotFound();
    }

  }
}
