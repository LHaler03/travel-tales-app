using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Dtos.Account;
using backend.Interfaces;
using backend.Models;
using backend.Service;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using System.Net;

namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly IAccountRepository _accountRepository;
        private readonly HttpClient _httpClient;
        private readonly IEmailSender _emailSender;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IConfiguration config, IAccountRepository accountRepository, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _config = config;
            _accountRepository = accountRepository;
            _httpClient = new HttpClient();
            _emailSender = emailSender;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var emailExists = await _userManager.FindByEmailAsync(registerDto.Email);
                if (emailExists != null)
                    return BadRequest("Email is already taken");

                var usernameExists = await _userManager.FindByNameAsync(registerDto.UserName);
                if (usernameExists != null)
                    return BadRequest("Username is already taken");
                    
                var user = new User
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName
                };

                var result = await _userManager.CreateAsync(user, registerDto.Password);

                if (result.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (!roleResult.Succeeded)
                        return StatusCode(500, "Failed to assign role.");
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action(
                        nameof(ConfirmEmail),
                        "Account",
                        new { userId = user.Id, token = WebUtility.UrlEncode(token) },
                        Request.Scheme);

                    var emailBody = $"Please confirm your account by clicking <a href='{confirmationLink}'>here</a>";
                    await _emailSender.SendEmailAsync(user.Email, "Please confirm your email", emailBody);

                    return Ok("User registered successfully. Please check your email to confirm your account.");

                }
                else
                {
                    return StatusCode(500, result.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, new { Error = e.Message, Details = e.StackTrace });
            }
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
                return BadRequest("Invalid email confirmation link");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var decodedToken = WebUtility.UrlDecode(token);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (result.Succeeded)
            {
                user.RefreshToken = "";
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(-1);
                await _userManager.UpdateAsync(user);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(-1)
                };
                Response.Cookies.Append("refreshToken", "", cookieOptions);
                return Ok("Email confirmed successfully");
            }
            else
            {
                return StatusCode(500, result.Errors);
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password is incorrect!");

            var accessToken = await _tokenService.CreateAccessToken(user);
            var refreshToken = _tokenService.CreateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);

            return Ok(
                new LoggedInUserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Token = accessToken,
                    EmailConfirmed = await _userManager.IsEmailConfirmedAsync(user),
                    Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? "User"
                }
            );
        }

        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            Console.WriteLine("Refreshing the token");
            Console.WriteLine();
            Console.WriteLine();

            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            {
                Console.WriteLine("NEMA REFRESHA");
                return StatusCode(403, "Unauthorized");
            }

            Console.WriteLine(refreshToken);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiry <= DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token.");

            var newAccessToken = await _tokenService.CreateAccessToken(user);
            var newRefreshToken = _tokenService.CreateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", newRefreshToken, cookieOptions);

            return Ok(new
            {
                AccessToken = newAccessToken,
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                EmailConfirmed = await _userManager.IsEmailConfirmedAsync(user),
                Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? "User",
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
                return Unauthorized("No refresh token found.");

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);

            if (user != null)
            {
                user.RefreshToken = "";
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(-1);
                await _userManager.UpdateAsync(user);
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(-1)
            };
            Response.Cookies.Append("refreshToken", "", cookieOptions);

            return Ok("Logged out successfully.");
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto googleLoginDto)
        {
            try
            {
                var userInfoResponse = await _httpClient.GetAsync(
                    $"https://www.googleapis.com/oauth2/v3/userinfo?access_token={googleLoginDto.Token}");

                if (!userInfoResponse.IsSuccessStatusCode)
                {
                    return BadRequest("Invalid Google token");
                }

                var googleUserInfo = await userInfoResponse.Content.ReadFromJsonAsync<GoogleUserInfo>();

                Console.WriteLine(googleUserInfo.Email);
                Console.WriteLine(googleUserInfo.Name);
                Console.WriteLine(googleUserInfo.Picture);
                Console.WriteLine(googleUserInfo.Email_verified);

                var payload = new GoogleJsonWebSignature.Payload
                {
                    Email = googleUserInfo.Email,
                    Name = googleUserInfo.Name,
                    Picture = googleUserInfo.Picture,
                    EmailVerified = googleUserInfo.Email_verified
                };

                var user = await _accountRepository.GetOrCreateUserAsync(payload);

                if (!user.EmailConfirmed)
                {
                    user.EmailConfirmed = true;
                    await _userManager.UpdateAsync(user);
                }

                var accessToken = await _tokenService.CreateAccessToken(user);
                var refreshToken = _tokenService.CreateRefreshToken();

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
                await _userManager.UpdateAsync(user);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7)
                };
                Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);

                return Ok(
                new LoggedInUserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Token = accessToken,
                    Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? "User",
                    EmailConfirmed = await _userManager.IsEmailConfirmedAsync(user)
                }
            );
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return NotFound();

            return Ok(new
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                EmailConfirmed = await _userManager.IsEmailConfirmedAsync(user),
                Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? "User",
            });
        }

        public class GoogleUserInfo
        {
            public required string Email { get; set; }
            public required string Name { get; set; }
            public required string Picture { get; set; }
            public bool Email_verified { get; set; }
        }
    }
}