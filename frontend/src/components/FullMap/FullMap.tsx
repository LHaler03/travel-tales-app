import { TileLayer, Marker } from 'react-leaflet';
import { Wrapper, StyledFullMapContainer } from './FullMap.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom';
import { CityPopup } from '../CityPopup/CityPopup';

export const FullMap = () => {
  const [markers, setMarkers] = useState<
    { id: number; geocode: [number, number]; popUp: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pictures, setPictures] = useState<string[]>([]);
  const [inforating, setInforating] = useState<
    {
      id: number;
      comment: string;
      rating: number;
      createdAt: string;
      userName: string;
    }[]
  >([]);
  const [selectedGeocode, setSelectedGeocode] = useState<
    [number, number] | null
  >(null);

  const iconformarkers = new Icon({
    iconUrl: './images/mapicon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

  const bounds = L.latLngBounds([-83, -199], [85, 202]);
  const location = useLocation();
  const { locationIdreview, city, showModalreview } = location.state || {};

  useEffect(() => {
    if (showModalreview) {
      setSelectedCity(city);
      setShowModal(showModalreview);
      fetchPictures(city);
      fetchRating(locationIdreview);
      setSelectedId(locationIdreview);
    }
  }, [showModalreview]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/locations`,
        );
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
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/${cityName}`,
      );
      setPictures(response.data);
    } catch (error) {
      console.error(`Error fetching pictures for ${cityName}:`, error);
    }
  };

  const fetchRating = async (id: number) => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/reviews/location/${id}`,
      );
      const rates = response.data.map(
        (rate: {
          id: number;
          comment: string;
          rating: number;
          createdAt: string;
          userName: string;
        }) => ({
          id: rate.id,
          comment: rate.comment,
          rating: rate.rating,
          createdAt: rate.createdAt,
          userName: rate.userName,
        }),
      );
      setInforating(rates);
    } catch (error) {
      console.error(`Error fetching rating for ${id}:`, error);
    }
  };

  const handleMarkerClick = (
    cityName: string,
    geocode: [number, number],
    id: number,
  ) => {
    setSelectedCity(cityName);
    setShowModal(true);
    fetchPictures(cityName);
    fetchRating(id);
    setSelectedGeocode(geocode);
    setSelectedId(id);
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
              click: () =>
                handleMarkerClick(marker.popUp, marker.geocode, marker.id),
            }}
          />
        ))}
      </StyledFullMapContainer>

      {showModal && (
        <CityPopup
          selectedCity={selectedCity}
          pictures={pictures}
          inforating={inforating}
          selectedId={selectedId}
          selectedGeocode={selectedGeocode}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Wrapper>
  );
};
