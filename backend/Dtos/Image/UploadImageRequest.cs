public class UploadImagesRequest
{
    public List<string> Images { get; set; } = new();
    public string? UserId { get; set; } = string.Empty;
    public bool ReviewRequired { get; set; }
    public int LocationId { get; set; }
}