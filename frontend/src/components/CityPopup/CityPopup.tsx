import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Popup,
  Popup_button_generate,
  Popup_button_close,
  Popup_content,
  CityPicture,
  StyledFaStarHalfAlt,
  StyledFaStar,
  StarsContainer,
  StarsTitle,
  CityTitle,
  Buttons,
  Comment,
  Comments,
} from './CityPopup.styled';
import { Cards, Cardmap, SingleCard } from '../Card/Card.styled';
import { useAuth } from '../../context/AuthContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CityPopupProps = {
  selectedCity: string | null;
  pictures: string[];
  inforating: { comment: string; rating: number }[];
  selectedId: number | null;
  selectedGeocode: [number, number] | null;
  handleCloseModal: () => void;
};

export const CityPopup: React.FC<CityPopupProps> = ({
  selectedCity,
  pictures,
  inforating,
  selectedId,
  selectedGeocode,
  handleCloseModal,
}) => {
  const imageSliderSettings = {
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

  const commentSliderSettings = (itemCount: number) => ({
    dots: true,
    infinite: itemCount > 2,
    speed: 500,
    slidesToShow: itemCount === 0 ? 1 : 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: itemCount > 1,
          dots: true,
        },
      },
    ],
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <Popup>
      <Popup_content>
        <Popup_button_close onClick={handleCloseModal}>X</Popup_button_close>
        <CityTitle>{selectedCity}</CityTitle>
        <Cards>
          <Cardmap>
            <Slider {...imageSliderSettings}>
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
              const averageRating =
                inforating.reduce((acc, curr) => acc + curr.rating, 0) /
                  inforating.length || 0;

              let starIcon;
              if (currentrating <= Math.floor(averageRating)) {
                starIcon = <StyledFaStar key={index} color='yellow' />;
              } else if (
                currentrating === Math.ceil(averageRating) &&
                averageRating % 1 !== 0
              ) {
                starIcon = <StyledFaStarHalfAlt key={index} color='yellow' />;
              } else {
                starIcon = <StyledFaStar key={index} color='white' />;
              }
              return <label key={currentrating}>{starIcon}</label>;
            })}
          </div>
        </StarsContainer>
        <Cards>
          <Cardmap>
            <Slider {...commentSliderSettings(inforating.length)}>
              {inforating.length > 0 ? (
                inforating.map((inforat, index) => (
                  <SingleCard key={index}>
                    <Comments>
                      <Comment>{inforat.comment}</Comment>
                    </Comments>
                  </SingleCard>
                ))
              ) : (
                <SingleCard>
                  <Comments>
                    <Comment>No reviews yet</Comment>
                  </Comments>
                </SingleCard>
              )}
            </Slider>
          </Cardmap>
        </Cards>
        <Buttons>
          <Popup_button_generate
            onClick={() =>
              navigate('/generate', {
                state: {
                  city: selectedCity,
                  cityId: selectedId,
                  geocode: selectedGeocode,
                },
              })
            }
          >
            Generate postcard
          </Popup_button_generate>
          {user && (
            <Popup_button_generate
              onClick={() =>
                navigate('/review', {
                  state: { city: selectedCity, locationId: selectedId },
                })
              }
            >
              Make review
            </Popup_button_generate>
          )}
        </Buttons>
      </Popup_content>
    </Popup>
  );
};
