using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using backend.Repository;
using backend.Interfaces;

public class PostcardCleanupService : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly ILogger<PostcardCleanupService> _logger;
    private readonly TimeSpan _interval = TimeSpan.FromHours(1); // Run every hour

    public PostcardCleanupService(
        IServiceProvider services,
        ILogger<PostcardCleanupService> logger)
    {
        _services = services;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using (var scope = _services.CreateScope())
                {
                    var postcardRepo = scope.ServiceProvider.GetRequiredService<IPostcardRepository>();
                    await postcardRepo.DeleteExpiredPostcardsAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred while cleaning up postcards: {ex.Message}");
            }

            await Task.Delay(_interval, stoppingToken);
        }
    }
} 