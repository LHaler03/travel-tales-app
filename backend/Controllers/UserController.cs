using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.User;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public UserController(ApplicationDBContext context)
        {
            _context = context;
        }
        // GET: api/user
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.Select(u => u.MapToUserDto()).ToList();
            return Ok(users);
        }
        // GET: api/user/{id}
        [HttpGet("{id}")]
        public IActionResult GetUserById([FromRoute] int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.MapToUserDto());
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserRequestDto userDto)
        {
            var user = userDto.ToUserFromDto();
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user.MapToUserDto());
        } 
    }
}