import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@remotion/player';
import { Horizontal1Image } from '../../../remotion/Horizontal1Image';
import {
  CityName,
  PlayerContainer,
  Wrapper,
  Sidebar,
  InputContainer,
  Picturechoice,
  CityPicture,
  ButtonsContainer,
} from '../Generate/Generate.styled';
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { ActionButton } from '../../shared/ActionButton';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Slider from 'react-slick';
import { SingleCard } from '../Card/Card.styled';
import { Cardmap } from '../Card/Card.styled';
import { Cards } from '../Card/Card.styled';

export const Generate1Image = () => {
  const imageSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { city, cityId } = location.state || {
    city: 'Default City',
  };

  const { user } = useAuth();

  const [titleColor, setTitleColor] = useState('#000000');
  const [fromColor, setFromColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [fromText, setFromText] = useState('travel tales');
  const [debouncedKey, setDebouncedKey] = useState('');
  const [customImage1, setCustomImage1] = useState<string>('');
  const [pictures, setPictures] = useState<string[]>([]);
  const [showpictures1, setShowpictures1] = useState(false);
  const [isForStock, setIsForStock] = useState(false);
  const [link1, setLink1] = useState<string | null>(null);

  const fetchPictures = async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/${city}`,
      );
      setPictures(response.data);
    } catch (error) {
      console.error(`Error fetching pictures for ${city}:`, error);
    }
  };

  const handlePictureSelect = (imageUrl: string) => {
    setCustomImage1(imageUrl);
    setShowpictures1(false);
  };

  const handleOdabirSlike = () => {
    setShowpictures1(!showpictures1);
    if (!pictures.length) {
      fetchPictures();
    }
  };

  const handleFormatReverse = () => {
    navigate('/generate1vertical', {
      state: { city, cityId },
    });
  };

  const handleNumberChange = () => {
    navigate('/generate', {
      state: { city, cityId },
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          try {
            console.log('user:', user);
            console.log('userId:', user?.id);
            if (!user) return;
            const result = await axios.post(
              `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/upload-image`,
              {
                images: [reader.result],
                userId: user?.id,
                reviewRequired: isForStock,
                locationId: cityId,
              },
            );
            setCustomImage1(result.data.urls[0]);
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!pictures.length) {
      fetchPictures();
    }
  }, [pictures.length]);

  useEffect(() => {
    if (pictures[0]) {
      setLink1(customImage1 || pictures[0]);
    }
  }, [pictures, customImage1]);

  const handleGenerate = async () => {
    if (!link1) {
      console.error('Link is not ready yet!');
      return;
    }

    const imageProps = {
      titleColor,
      userId: user?.id,
      locationId: cityId,
      fromColor,
      borderColor,
      fromText,
      city,
      link1,
      component: 'Horizontal1Image',
    };

    console.log(imageProps);
    console.log(JSON.stringify(imageProps));
  };

  const debouncedUpdate = useCallback(
    debounce((values: string) => {
      setDebouncedKey(values);
    }, 150),
    [],
  );

  React.useEffect(() => {
    const newKey = `${titleColor}-${fromColor}-${borderColor}-${fromText}-${city}-${customImage1}`;
    debouncedUpdate(newKey);
  }, [fromText, titleColor, fromColor, borderColor, city, customImage1]);

  return (
    <>
      <Wrapper>
        <Sidebar>
          <CityName>{city}</CityName>
          <InputContainer>
            <label>Image:</label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => handleImageUpload(e)}
            />
            <Picturechoice onClick={() => handleOdabirSlike()}>
              Select image
            </Picturechoice>
          </InputContainer>
          {showpictures1 && (
            <Cards>
              <Cardmap>
                <Slider {...imageSliderSettings}>
                  {pictures.map((picture, index) => (
                    <SingleCard key={index}>
                      <CityPicture
                        key={index}
                        src={picture}
                        alt={`${city}`}
                        onClick={() => handlePictureSelect(picture)}
                      />
                    </SingleCard>
                  ))}
                </Slider>
              </Cardmap>
            </Cards>
          )}
          <InputContainer>
            <label>I want my uploaded image in stock photos: </label>
            <input
              type='checkbox'
              checked={isForStock}
              onChange={(e) => setIsForStock(e.target.checked)}
            />
          </InputContainer>
          <InputContainer>
            <label>Title Color:</label>
            <input
              type='color'
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label>From Text Color:</label>
            <input
              type='color'
              value={fromColor}
              onChange={(e) => setFromColor(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label>Border Color:</label>
            <input
              type='color'
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label>From Text:</label>
            <input
              type='text'
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
            />
          </InputContainer>
          <ButtonsContainer>
            <ActionButton onClick={handleFormatReverse}>
              Reverse Format
            </ActionButton>
            <ActionButton onClick={handleNumberChange}>2 Images</ActionButton>
            <ActionButton onClick={handleGenerate}>Generate</ActionButton>
          </ButtonsContainer>
        </Sidebar>
        <PlayerContainer>
          <Player
            key={debouncedKey}
            component={Horizontal1Image}
            compositionWidth={1920}
            compositionHeight={1080}
            durationInFrames={1}
            fps={30}
            style={{
              width: '100%',
            }}
            inputProps={{
              fromText: fromText,
              titleColor: titleColor,
              fromColor: fromColor,
              borderColor: borderColor,
              cityName: city,
              customImage1,
            }}
          />
        </PlayerContainer>
      </Wrapper>
    </>
  );
};
