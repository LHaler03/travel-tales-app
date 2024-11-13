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
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User?> DeleteAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            await _userManager.DeleteAsync(user);
            return user;
        }
        public async Task<List<UserDto>> GetAllAsync()
        {
            return await _userManager.Users.Select(u => u.MapToUserDto()).ToListAsync();
        }
        public async Task<User?> GetByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);

        }

        public async Task<User?> UpdateAsync(string id, UpdateDto updateDto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            user.FirstName = updateDto.FirstName;
            user.LastName = updateDto.LastName;
            user.Email = updateDto.Email;
            user.UserName = updateDto.UserName;
            // Update password if needed
            if (!string.IsNullOrEmpty(updateDto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, updateDto.Password);
                if (!result.Succeeded)
                {
                    // Handle error
                    throw new Exception($"Password reset failed: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                // Handle error
                throw new Exception($"User update failed: {string.Join(", ", updateResult.Errors.Select(e => e.Description))}");
            }
            return user;
        }
    }
}
