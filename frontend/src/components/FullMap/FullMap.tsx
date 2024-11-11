import { TileLayer, Marker } from 'react-leaflet';
import { StyledMapContainer } from './FullMap.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

export const FullMap = () => {
  const [markers, setMarkers] = useState<
    { id: number; geocode: [number, number]; popUp: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const iconformarkers = new Icon({
    iconUrl: './images/mapicon.png',
    iconSize: [38, 38],
    iconAnchor: [17.5, 17.5],
    popupAnchor: [0, -17.5],
  });
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://3.74.155.131/api/locations');
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

  const handleMarkerClick = (cityName: string) => {
    setSelectedCity(cityName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCity(null);
  };


  console.log(markers);
  return (
    <>
      <StyledMapContainer id='map' center={[54.526, 15.2551]} zoom={3}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={iconformarkers} 
          eventHandlers={{
              click: () => handleMarkerClick(marker.popUp),
            }}/>
        ))}
      </StyledMapContainer>

      {showModal && (
        <div onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCity}</h2>
            <p>Slike {selectedCity}...</p>
            <button onClick={handleCloseModal}>Zatvori</button>
          </div>
        </div>
      )}
    </>
  );
};
