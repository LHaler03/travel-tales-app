
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
  public class LocationController : ControllerBase
  {

    private readonly ApplicationDBContext _context;
    public LocationController(ApplicationDBContext context)
    {
      _context = context;
    }

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

      if (location == null) NotFound();

      return Ok(location);
    }

    [HttpPost]
    public IActionResult CreateLocation([FromBody] CreateLocationRequestDto locationDto)
    {

      var locationModel = locationDto.ToLocationFromCreateDTO();

      _context.Locations.Add(locationModel);
      _context.SaveChanges();

      return CreatedAtAction(nameof(GetById), new { id = locationModel.Id }, locationModel);
    }

  }
}
