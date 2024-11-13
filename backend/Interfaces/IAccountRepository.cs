using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Google.Apis.Auth;

namespace backend.Interfaces
{
    public interface IAccountRepository
    {
        Task<User> GetOrCreateUserAsync(GoogleJsonWebSignature.Payload payload);
    }
}