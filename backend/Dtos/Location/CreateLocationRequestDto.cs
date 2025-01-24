using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Location
{
    public class CreateLocationRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public decimal Lat { get; set; }
        public decimal Lon { get; set; }
        public List<string> Images { get; set; } = [];
    }
}