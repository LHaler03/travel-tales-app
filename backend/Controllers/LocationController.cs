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
  public class LocationController(ApplicationDBContext context, ILocationRepository locationRepo) : ControllerBase
  {
    private readonly ApplicationDBContext _context = context;
    private readonly ILocationRepository _locationRepo = locationRepo;

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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLocationRequestDto locationDto)
    {
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
