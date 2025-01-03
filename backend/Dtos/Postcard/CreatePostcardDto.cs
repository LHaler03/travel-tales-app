using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Postcard
{
    public class CreatePostcardDto
    {
        [Required]
        public string ImageUrl { get; set; } = string.Empty;
        [Required]
        public int LocationId { get; set; }
        public string? UserId { get; set; }
    }

}