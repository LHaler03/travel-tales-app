import React from 'react';
import { TileLayer, Marker } from 'react-leaflet';
import { Wrapper, StyledFullMapContainer } from './CityInfo.styled';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CityInfoProps = {
  city: string;
  geocode: [number, number];
};

const CityInfo: React.FC<CityInfoProps> = ({ city, geocode }) => {
  const iconformarkers = new Icon({
    iconUrl: './images/mapicon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });
  const bounds = L.latLngBounds([-83, -199], [85, 202]);
  return (
    <>
      <div>
        <h1>{city}</h1>
        <p>{geocode}</p>
      </div>
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
          <Marker position={geocode} icon={iconformarkers} />
        </StyledFullMapContainer>
      </Wrapper>
    </>
  );
};

export default CityInfo;
