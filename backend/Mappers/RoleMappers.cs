using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Role;
using backend.Models;

namespace backend.Mappers
{
    public static class RoleMappers
    {
        public static RoleDto MapToRoleDto(this Role role) => new RoleDto
        {
            Id = role.Id,
            Name = role.Name
        };
    }
}