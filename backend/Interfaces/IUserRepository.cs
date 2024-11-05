using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Dtos.User;
using backend.Models;

namespace backend.Interfaces
{
    public interface IUserRepository 
    {
        Task<List<UserDto>> GetAllAsync();
        Task<User?> GetByIdAsync(string id);
        Task<User?> UpdateAsync(string id, UpdateDto updateDto);
        Task<User?> DeleteAsync(string id);
    }
}