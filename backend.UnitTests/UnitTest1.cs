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
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication;
using MockQueryable.Moq;

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
        private Mock<UserManager<User>> _userManagerMock;
        private Mock<SignInManager<User>> _signInManagerMock;

        [SetUp]
        public void Setup()
        {
            var dbContextOptions = new DbContextOptionsBuilder<ApplicationDBContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDBContext(dbContextOptions);

            // Setup UserManager mock
            var userStore = new Mock<IUserStore<User>>();
            _userManagerMock = new Mock<UserManager<User>>(
                userStore.Object,
                null, null, null, null, null, null, null, null);

            // Setup required services for SignInManager
            var contextAccessor = new Mock<IHttpContextAccessor>();
            var userPrincipalFactory = new Mock<IUserClaimsPrincipalFactory<User>>();
            var identityOptions = new Mock<IOptions<IdentityOptions>>();
            var logger = new Mock<ILogger<SignInManager<User>>>();
            var schemes = new Mock<IAuthenticationSchemeProvider>();
            var confirmation = new Mock<IUserConfirmation<User>>();

            _signInManagerMock = new Mock<SignInManager<User>>(
                _userManagerMock.Object,
                contextAccessor.Object,
                userPrincipalFactory.Object,
                identityOptions.Object,
                logger.Object,
                schemes.Object,
                confirmation.Object);

            var s3Service = new Mock<IS3Service>();
            var repoLogger = new Mock<ILogger<PostcardRepository>>();
            var tokenService = new Mock<ITokenService>();
            var configuration = new Mock<IConfiguration>();
            var emailSender = new Mock<IEmailSender>();

            _accountRepository = new AccountRepository(_userManagerMock.Object);
            _locationRepository = new LocationRepository(_context);
            _postcardRepository = new PostcardRepository(_context, s3Service.Object, repoLogger.Object);
            _reviewRepository = new ReviewRepository(_context);

            _accountController = new AccountController(
                _userManagerMock.Object,
                _signInManagerMock.Object,
                tokenService.Object,
                configuration.Object,
                _accountRepository,
                emailSender.Object);

            _locationController = new LocationController(_context, _locationRepository);
            _reviewController = new ReviewController(_reviewRepository);

            // Setup default behavior for UserManager
            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), "User"))
                .ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(x => x.GenerateEmailConfirmationTokenAsync(It.IsAny<User>()))
                .ReturnsAsync("test-token");
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
        
        [Test]
        public async Task RegisterUser_ValidData_Test()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(
                Mock.Of<IUserStore<User>>(),
                null, null, null, null, null, null, null, null);

            var mockSignInManager = new Mock<SignInManager<User>>(
                mockUserManager.Object,
                Mock.Of<IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(),
                null, null, null, null);

            var mockTokenService = new Mock<ITokenService>();
            var mockConfiguration = new Mock<IConfiguration>();
            var mockAccountRepo = new Mock<IAccountRepository>();
            var mockEmailSender = new Mock<IEmailSender>();
            var mockUrlHelper = new Mock<IUrlHelper>();

            // Setup UserManager mocks
            mockUserManager.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);
            mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), "User"))
                .ReturnsAsync(IdentityResult.Success);
            mockUserManager.Setup(x => x.GenerateEmailConfirmationTokenAsync(It.IsAny<User>()))
                .ReturnsAsync("test-token");

            // Setup IUrlHelper mock to return the confirmation URL
            mockUrlHelper.Setup(x => x.Link(It.IsAny<string>(), It.IsAny<object>()))
                .Returns("http://test.com/confirm");

            // Setup controller context
            var httpContext = new DefaultHttpContext();
            var controllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };

            var controller = new AccountController(
                mockUserManager.Object,
                mockSignInManager.Object,
                mockTokenService.Object,
                mockConfiguration.Object,
                mockAccountRepo.Object,
                mockEmailSender.Object)
            {
                ControllerContext = controllerContext,
                Url = mockUrlHelper.Object
            };

            var registerDto = new RegisterDto
            {
                UserName = "testuser",
                Email = "test@example.com",
                Password = "Test123!",
                FirstName = "Test",
                LastName = "User"
            };

            // Act
            var result = await controller.Register(registerDto);

            // Assert
            Assert.That(result, Is.TypeOf<OkObjectResult>());
            var okResult = (OkObjectResult)result;
            Assert.That(okResult.StatusCode, Is.EqualTo(200));
            Assert.That(okResult.Value, Is.EqualTo("User registered successfully. Please check your email to confirm your account."));

            // Verify calls
            mockUserManager.Verify(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()), Times.Once);
            mockUserManager.Verify(x => x.AddToRoleAsync(It.IsAny<User>(), "User"), Times.Once);
            mockUserManager.Verify(x => x.GenerateEmailConfirmationTokenAsync(It.IsAny<User>()), Times.Once);
            mockEmailSender.Verify(x => x.SendEmailAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>()), Times.Once);
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
            // Arrange
            var mockUserStore = new Mock<IUserStore<User>>();
            var mockUserManager = new Mock<UserManager<User>>(
                mockUserStore.Object, null, null, null, null, null, null, null, null);
            var mockSignInManager = new Mock<SignInManager<User>>(
                mockUserManager.Object,
                new Mock<IHttpContextAccessor>().Object,
                new Mock<IUserClaimsPrincipalFactory<User>>().Object,
                null, null, null, null);
            var mockTokenService = new Mock<ITokenService>();

            var testUser = new User
            {
                UserName = "testuser",
                Email = "testuser@example.com"
            };

            // Create a list of users and mock the DbSet
            var users = new List<User> { testUser }.AsQueryable().BuildMockDbSet();
            mockUserManager.Setup(x => x.Users).Returns(users.Object);

            mockSignInManager.Setup(x => x.CheckPasswordSignInAsync(It.IsAny<User>(), It.IsAny<string>(), It.IsAny<bool>()))
                .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Failed);

            var accountController = new AccountController(mockUserManager.Object, mockSignInManager.Object, mockTokenService.Object, null, null, null);

            var loginDto = new LoginDto
            {
                Username = "testuser",
                Password = "wrongpassword"
            };

            // Act
            var result = await accountController.Login(loginDto);

            // Assert
            Assert.IsInstanceOf<UnauthorizedObjectResult>(result);
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
            // Arrange
            var mockRepo = new Mock<IReviewRepository>();
            var controller = new ReviewController(mockRepo.Object);

            var createReviewDto = new CreateReviewDto
            {
                UserId = "user123",
                LocationId = 1,
                Rating = 5,
                Comment = new string('a', 1001) // Simulating content exceeding the maximum length
            };

            mockRepo
                .Setup(repo => repo.AddReviewAsync(It.IsAny<Review>()))
                .ThrowsAsync(new InvalidOperationException("Content is too long."));

            // Act
            var result = await controller.CreateReview(createReviewDto);

            // Assert
            Assert.True(result is BadRequestObjectResult);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.NotNull(badRequestResult);
        }
    }
}