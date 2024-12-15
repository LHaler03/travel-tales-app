import { TileLayer, Marker } from 'react-leaflet';
import {
  Modal,
  Modal_button_generate,
  Modal_button_close,
  Modal_content,
  Wrapper,
  StyledFullMapContainer,
} from './FullMap.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import { Star } from '../Star/Star';

export const FullMap = () => {
  const [markers, setMarkers] = useState<
    { id: number; geocode: [number, number]; popUp: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [pictures, setPictures] = useState<{ pictureurl: string }[]>([]);

  const iconformarkers = new Icon({
    iconUrl: './images/mapicon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

  const bounds = L.latLngBounds([-83, -199], [85, 202]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://3.74.155.131/api/locations');
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
        setMarkers(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const fetchPictures = async (cityName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5185/api/s3/${cityName}`,
      );
      //console.log(response.data)
      setPictures(response.data);
    } catch (error) {
      console.log(`Error fetching pictures for ${cityName}:`, error);
    }
  };

  const handleMarkerClick = (cityName: string) => {
    setSelectedCity(cityName);
    setShowModal(true);
    fetchPictures(cityName);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCity(null);
  };

  return (
    <Wrapper>
      <StyledFullMapContainer
        id='map'
        center={[50, 10]}
        zoom={2}
        minZoom={2}
        maxBounds={bounds}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geocode}
            icon={iconformarkers}
            eventHandlers={{
              click: () => handleMarkerClick(marker.popUp),
            }}
          />
        ))}
      </StyledFullMapContainer>

      {showModal && (
        <Modal>
          <Modal_content>
            <Modal_button_close onClick={handleCloseModal}>
              X
            </Modal_button_close>
            <h1>{selectedCity}</h1>
            <p>Images for {selectedCity}...</p>
            {pictures.map((picture, index) => (
              <img
                key={index}
                src={picture.pictureurl}
                alt={`${selectedCity}`}
              />
            ))}
            <div>
              <div>Food:</div>
              <Star />
            </div>
            <div>
              <div>Weather:</div>
              <Star />
            </div>
            <div>
              <div>Local culture:</div>
              <Star />
            </div>
            <Modal_button_generate>Generate postcard</Modal_button_generate>
          </Modal_content>
        </Modal>
      )}
    </Wrapper>
  );
};
