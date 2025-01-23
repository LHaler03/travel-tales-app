using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class PostcardProps
    {

        public string UserId { get; set; } = string.Empty;
        public int LocationId { get; set; }
        public string Component { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string TitleColor { get; set; } = string.Empty;
        public string FromText { get; set; } = string.Empty;
        public string FromColor { get; set; } = string.Empty;
        public string BorderColor { get; set; } = string.Empty;
        public string TextBgColor { get; set; } = string.Empty;
        public string Link1 { get; set; } = string.Empty;
        public string Link2 { get; set; } = string.Empty;
    }
}