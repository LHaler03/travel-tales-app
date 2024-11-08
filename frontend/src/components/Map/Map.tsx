import { TileLayer, Marker } from 'react-leaflet';
import { StyledMapContainer } from './Map.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

export const Map = () => {
  const [markers, setMarkers] = useState<
    { id: number; geocode: [number, number]; popUp: string }[]
  >([]);

  const iconformarkers = new Icon({
    iconUrl: './images/mapicon.png',
    iconSize: [38, 38],
  });
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://3.79.27.160/api/locations');
        console.log(response);
        const locations = response.data.map(
          (location: {
            id: number;
            lat: number;
            lon: number;
            name: string;
          }) => ({
            id: location.id,
            geocode: [location.lat, location.lon] as [number, number],
            popUp: location.name,
          }),
        );
        /*console.log(locations);*/
        setMarkers(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  console.log(markers);
  return (
    <StyledMapContainer id='map' center={[54.526, 15.2551]} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={iconformarkers} />
      ))}
    </StyledMapContainer>
  );
};
