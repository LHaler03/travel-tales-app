using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Location;
using backend.Models;

namespace backend.Mappers
{
    public static class LocationMappers
    {
        public static Location ToLocationFromCreateDTO(this CreateLocationRequestDto locationDto)
        {
            return new Location
            {
                Name = locationDto.Name,
                Country = locationDto.Country,
                Lat = locationDto.Lat,
                Lon = locationDto.Lon,
            };
        }
    }


}