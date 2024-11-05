/*
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.User;
using backend.Models;

namespace backend.Mappers
{
    public static class UserMappers
    {
        public static UserDto MapToUserDto(this User user) => new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName, 
            Email = user.Email,
            UserName = user.UserName,
            // RoleId = user.RoleId
        };

        public static User ToUserFromDto(this CreateUserRequestDto userDto) => new User
        {
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
            Email = userDto.Email,
            UserName = userDto.UserName,
            Password = userDto.Password,
            // RoleId = userDto.RoleId
        };
    }
}
*/