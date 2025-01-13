import { TileLayer, Marker } from 'react-leaflet';
import {
  Modal,
  Modal_button_generate,
  Modal_button_close,
  Modal_content,
  Wrapper,
  StyledFullMapContainer,
  CityPicture,
  StyledFaStarHalfAlt,
  StyledFaStar,
  StarsContainer,
  StarsTitle,
  CityTitle,
} from './FullMap.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import { Cards, Cardmap, SingleCard } from '../Card/Card.styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

export const FullMap = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const [markers, setMarkers] = useState<
    { id: number; geocode: [number, number]; popUp: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [pictures, setPictures] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(2.5);
  const [selectedGeocode, setSelectedGeocode] = useState<
    [number, number] | null
  >(null);

  const iconformarkers = new Icon({
    iconUrl: './images/mapicon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

  const bounds = L.latLngBounds([-83, -199], [85, 202]);

  const navigate = useNavigate();

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

  const fetchRating = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5185/api/reviews/location/${id}`,
      );
      //console.log(response.data)
      setRating(response.data);
    } catch (error) {
      console.log(`Error fetching pictures for ${id}:`, error);
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
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCity(null);
  };

  /*const HandleToGeneratePage: FC = () => {
    useMapEvents({
      click: () => navigate('/generate'),
    });
    return null;
  };*/

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
        <Modal>
          <Modal_content>
            <Modal_button_close onClick={handleCloseModal}>
              X
            </Modal_button_close>
            <CityTitle>{selectedCity}</CityTitle>
            <Cards>
              <Cardmap>
                <Slider {...settings}>
                  {pictures.map((picture, index) => (
                    <SingleCard key={index}>
                      <CityPicture
                        key={index}
                        src={picture}
                        alt={`${selectedCity}`}
                      />
                    </SingleCard>
                  ))}
                </Slider>
              </Cardmap>
            </Cards>
            <StarsContainer>
              <StarsTitle>Average rating:</StarsTitle>
              <div>
                {[...Array(5)].map((_, index) => {
                  const currentrating = index + 1;
                  let starIcon;
                  if (currentrating <= Math.floor(rating)) {
                    starIcon = <StyledFaStar key={index} color='yellow' />;
                  } else if (
                    currentrating === Math.ceil(rating) &&
                    rating % 1 !== 0
                  ) {
                    starIcon = (
                      <StyledFaStarHalfAlt key={index} color='yellow' />
                    );
                  } else {
                    starIcon = <StyledFaStar key={index} color='white' />;
                  }
                  return <label key={currentrating}>{starIcon}</label>;
                })}
              </div>
            </StarsContainer>
            <Modal_button_generate
              onClick={() =>
                navigate('/generate', {
                  state: { city: selectedCity, geocode: selectedGeocode },
                })
              }
            >
              Generate postcard
            </Modal_button_generate>
          </Modal_content>
        </Modal>
      )}
    </Wrapper>
  );
};
