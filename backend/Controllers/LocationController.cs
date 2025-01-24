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
    private readonly IS3Service _s3Service;

    public LocationController(ApplicationDBContext context, ILocationRepository locationRepo, IS3Service s3Service)
    {
      _context = context;
      _locationRepo = locationRepo;
      _s3Service = s3Service;
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
      try
      {
        var existingLocation = (await _locationRepo.GetAllAsync())
            .FirstOrDefault(l => (l.Name == locationDto.Name && l.Country == locationDto.Country) ||
                                 (Math.Abs(l.Lat - locationDto.Lat) < 0.001m &&
                                  Math.Abs(l.Lon - locationDto.Lon) < 0.001m));

        if (existingLocation != null)
          return Forbid("Location too close to an existing one.");

        var locationModel = await _locationRepo.CreateAsync(locationDto.ToLocationFromCreateDTO());

        if (locationDto.Images == null || locationDto.Images.Count < 2)
          return BadRequest("You must upload at least two images");

        foreach (var image in locationDto.Images)
        {
          string folderPath = $"valid/{locationModel.Name}";
          await _s3Service.UploadStockImagesAsync(image, folderPath);
        }

        return CreatedAtAction(nameof(GetById), new { id = locationModel.Id }, locationModel);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }

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
