using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.User;
using backend.Models;

namespace backend.Interfaces
{
    public interface IUserRepository 
    {
        Task<List<UserDto>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User> CreateAsync(User userModel);
        Task<User?> UpdateAsync(int id, UpdateUserRequestDto userDto);
        Task<User?> DeleteAsync(int id);
    }
}