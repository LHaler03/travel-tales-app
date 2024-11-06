using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Account
{
    public class LogedInUserDto
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Token { get; set; }
    }
}