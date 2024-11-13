using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class AccountRepository : IAccountRepository
    {

        private readonly UserManager<User> _userManager;
        public AccountRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<User> GetOrCreateUserAsync(GoogleJsonWebSignature.Payload payload)
        {
            var existingUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == payload.Email.ToLower());

            if (existingUser != null)
            {
                // If the user exists, return the user object
                return existingUser;
            }

            // If the user doesn't exist, create a new user based on the payload
            var newUser = new User
            {
                Email = payload.Email,
                FirstName = payload.Name.Split(" ")[0],
                LastName = payload.Name.Split(" ")[1],
                UserName = payload.Email
            };

            // Generate a random password that won't be used
            var password = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            var result = await _userManager.CreateAsync(newUser, password);

            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

            return newUser;
        }

    }
}