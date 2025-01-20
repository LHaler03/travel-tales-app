using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Postcard
{
    public class PostcardDto
    {
        public int Id { get; set; }
        public string S3Key { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string LocationName { get; set; } = string.Empty;
    }
}