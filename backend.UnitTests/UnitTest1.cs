using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using backend.Data;
using backend.Repository;
using backend.Service;
using backend.Interfaces;
using backend.Controllers;
using backend.Dtos.Account;
using backend.Dtos.Review;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Moq;
using Microsoft.Extensions.Configuration;

namespace backend.UnitTests
{
    [TestFixture]
    public class ComponentTests
    {
        private ApplicationDBContext _context;
        private AccountRepository _accountRepository;
        private LocationRepository _locationRepository;
        private PostcardRepository _postcardRepository;
        private ReviewRepository _reviewRepository;
        private AccountController _accountController;
        private LocationController _locationController;
        private ReviewController _reviewController;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDBContext(options);

            var userStore = new Mock<IUserStore<User>>().Object;
            var userManager = new Mock<UserManager<User>>(userStore, null, null, null, null, null, null, null, null).Object;
            var signInManager = new Mock<SignInManager<User>>(userManager, null, null, null, null, null, null).Object;
            var s3Service = new Mock<IS3Service>().Object;
            var logger = new Mock<ILogger<PostcardRepository>>().Object;
            var tokenService = new Mock<ITokenService>().Object;
            var configuration = new Mock<IConfiguration>().Object;
            var emailSender = new Mock<IEmailSender>().Object;

            _accountRepository = new AccountRepository(userManager);
            _locationRepository = new LocationRepository(_context);
            _postcardRepository = new PostcardRepository(_context, s3Service, logger);
            _reviewRepository = new ReviewRepository(_context);

            _accountController = new AccountController(userManager, signInManager, tokenService, configuration, _accountRepository, emailSender);
            _locationController = new LocationController(_context, _locationRepository);
            _reviewController = new ReviewController(_reviewRepository);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        [Test]
        public async Task RegisterUser_ValidData_Test()
        {
            // Assign
            var registerDto = new RegisterDto
            {
                Email = "newuser@example.com",
                Password = "Password123"
            };

            // Act
            var result = await _accountController.Register(registerDto) as ObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(201, result.StatusCode);
            Assert.AreEqual("User registered successfully. Please check your email to confirm your account.", result.Value);
            Assert.AreEqual(1, await _context.Users.CountAsync());
        }

        [Test]
        public async Task RegisterUser_InvalidPassword_ReturnsBadRequest()
        {
            // Assign
            var registerDto = new RegisterDto
            {
                Email = "user@example.com",
                Password = "P123" // Invalid password
            };

            // Act
            var result = await _accountController.Register(registerDto) as ObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual(0, await _context.Users.CountAsync());
        }

        [Test]
        public async Task LoginUser_WrongPassword_ReturnsUnauthorized()
        {
            // Assign
            var user = new User
            {
                UserName = "existinguser",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("RealPassword123")
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var loginDto = new LoginDto
            {
                Username = "existinguser",
                Password = "WrongPassword123"
            };

            // Act
            var result = await _accountController.Login(loginDto) as UnauthorizedObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(401, result.StatusCode);
            Assert.AreEqual("UserName not found and/or password is incorrect!", result.Value);
        }

        [Test]
        public async Task DeleteLocation_NonExistentId_ReturnsNotFound()
        {
            // Assign
            var nonExistentId = 9999;

            // Act
            var result = await _locationController.Delete(nonExistentId) as NotFoundResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(404, result.StatusCode);
        }

        [Test]
        public async Task GetPostcardsByUser_ValidUserId_ReturnsPostcards()
        {
            // Assign 
            // nisam siguran jel ide CreatePostcardDto ili PostcardDto pa pliz to napisite kak treba
            _context.Postcards.Add(new Postcard
            {
                Id = 1,
                UserId = "1"
            });
            await _context.SaveChangesAsync();

            // Act
            var postcards = await _postcardRepository.GetPostcardsByUserIdAsync("1");

            // Assert
            Assert.IsNotNull(postcards);
            Assert.AreEqual(1, postcards.Count());
        }

        [Test]
        public async Task CreateReview_ContentTooLong_ReturnsError()
        {
            // Assign
            var createReviewDto = new CreateReviewDto
            {
                LocationId = 1,
                UserId = "1",
                Comment = new string('A', 501),
                Rating = 5
            };

            // Act
            var result = await _reviewController.CreateReview(createReviewDto) as ObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.AreEqual("An error occurred while creating the review", result.Value);
            Assert.AreEqual(0, await _context.Reviews.CountAsync());
        }
    }
}