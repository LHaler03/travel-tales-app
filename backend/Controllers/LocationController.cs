using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Location;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [Route("api/location")]
  public class LocationController(ApplicationDBContext context) : ControllerBase
  {
    private readonly ApplicationDBContext _context = context;

    [HttpGet]
    public IActionResult GetAll()
    {
      var locations = _context.Locations.ToList();

      return Ok(locations);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
      var location = _context.Locations.Find(id);

      if (location == null) return NotFound();

      return Ok(location);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateLocationRequestDto locationDto)
    {
      var locationModel = locationDto.ToLocationFromCreateDTO();

      _context.Locations.Add(locationModel);
      _context.SaveChanges();

      return CreatedAtAction(nameof(GetById), new { id = locationModel.Id }, locationModel);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromRoute] int id, [FromBody] UpdateLocationRequestDto updateLocationDto)
    {
      var locationModel = _context.Locations.FirstOrDefault(x => x.Id == id);

      if (locationModel == null) return NotFound();

      locationModel.Name = updateLocationDto.Name;
      locationModel.Country = updateLocationDto.Country;
      locationModel.Lat = updateLocationDto.Lat;
      locationModel.Lon = updateLocationDto.Lon;

      _context.SaveChanges();

      return Ok(locationModel);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete([FromRoute] int id)
    {
      var locationModel = _context.Locations.FirstOrDefault(x => x.Id == id);

      if (locationModel == null) return NotFound();

      _context.Locations.Remove(locationModel);

      _context.SaveChanges();

      return NoContent();
    }

  }
}
