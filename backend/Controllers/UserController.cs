using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Account;
using backend.Dtos.User;
using backend.Interfaces;
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
        private readonly IUserRepository _userRepo;
        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }
        // GET: api/user
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepo.GetAllAsync();
            return Ok(users);
        }
        // GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] string id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.MapToUserDto());
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] string id, [FromBody] UpdateDto updateDto)
        {
            var user = await _userRepo.UpdateAsync(id, updateDto);
            if (user == null)
            {
                return NotFound();
            }
            
            return Ok(user.MapToUserDto());
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            var user = await _userRepo.DeleteAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}