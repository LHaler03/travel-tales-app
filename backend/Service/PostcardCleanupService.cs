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
    private readonly TimeSpan _interval = TimeSpan.FromHours(12); // Run every 12 hours

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
                    var s3Service = scope.ServiceProvider.GetRequiredService<IS3Service>();
                    
                    // Clean temporary S3 folder
                    var temporaryFiles = await s3Service.ListFilesInFolderAsync("temporary");
                    foreach (var file in temporaryFiles)
                    {
                        await s3Service.DeleteObjectAsync(file);
                    }
                    
                    _logger.LogInformation($"Cleaned {temporaryFiles.Count} temporary files from S3");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred while cleaning up temporary files: {ex.Message}");
            }

            await Task.Delay(_interval, stoppingToken);
        }
    }
} 