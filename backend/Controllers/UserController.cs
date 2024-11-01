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
    [Route("api/users")]
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
        // POST: api/user
        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserRequestDto userDto)
        {
            var user = userDto.ToUserFromDto();
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user.MapToUserDto());
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromRoute] int id, [FromBody] UpdateUserRequestDto userUpdateDto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.FirstName = userUpdateDto.FirstName;
            user.LastName = userUpdateDto.LastName;
            user.Email = userUpdateDto.Email;
            user.UserName = userUpdateDto.UserName;
            user.Password = userUpdateDto.Password;
            user.RoleId = userUpdateDto.RoleId;

            _context.SaveChanges();
            return Ok(user.MapToUserDto());
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser([FromRoute] int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }
    }
}