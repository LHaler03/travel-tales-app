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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly UserManager<User> _userManager;
        public UserController(IUserRepository userRepo, UserManager<User> userManager)
        {
            _userRepo = userRepo;
            _userManager = userManager;
        }
        // GET: api/users
        [HttpGet]
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepo.GetAllAsync();
            return Ok(users);
        }
        // GET: api/users/{id}
        [HttpGet("{id}")]
        //[Authorize]
        public async Task<IActionResult> GetUserById([FromRoute] string id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.MapToUserDto());
        }

        // PUT: api/users/{id}
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

        [HttpPut("change-role/{id}")]
        public async Task<IActionResult> ChangeUserRole([FromRoute] string id)
        {
            var user = await _userRepo.GetByIdAsync(id);

            if (user == null) return NotFound();

            IList<string> currentRolesList = await _userManager.GetRolesAsync(user!);

            if (currentRolesList.Count < 1)
            {
                await _userManager.AddToRoleAsync(user!, "Admin");
                return Ok(new { message = "Role successfully changed!" });
            }

            await _userManager.RemoveFromRolesAsync(user!, currentRolesList);

            string newRole = currentRolesList[0] == "Admin" ? "User" : "Admin";

            await _userManager.AddToRoleAsync(user!, newRole);

            return Ok(new { message = "Role successfully changed!" });
        }

        // DELETE: api/users/{id}
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