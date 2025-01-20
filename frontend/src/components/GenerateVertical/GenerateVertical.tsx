import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@remotion/player';
import { VerticalImage } from '../../../remotion/VerticalImage';
import {
  CityName,
  PlayerContainer,
  Wrapper,
  Sidebar,
  ButtonsContainer,
  InputContainer,
  Picturechoice,
  CityPicture,
} from './GenerateVertical.styled';
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { ActionButton } from '../../shared/ActionButton';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Slider from 'react-slick';
import { SingleCard } from '../Card/Card.styled';
import { Cardmap } from '../Card/Card.styled';
import { Cards } from '../Card/Card.styled';

export const GenerateVertical = () => {
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
  const [customImage2, setCustomImage2] = useState<string>('');
  const [pictures, setPictures] = useState<string[]>([]);
  const [showpictures1, setShowpictures1] = useState(false);
  const [showpictures2, setShowpictures2] = useState(false);
  const [isForStock, setIsForStock] = useState(false);
  const [link1, setLink1] = useState<string | null>(null);
  const [link2, setLink2] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<{
    imageLink: string;
    downloadLink: string;
  }>({ imageLink: '', downloadLink: '' });

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

  const handlePictureSelect = (imageUrl: string, imageNumber: 1 | 2) => {
    if (imageNumber === 1) {
      setCustomImage1(imageUrl);
      setShowpictures1(false);
    } else {
      setCustomImage2(imageUrl);
      setShowpictures2(false);
    }
  };

  const handleOdabirSlike = (imageNumber: 1 | 2) => {
    if (imageNumber === 1) {
      setShowpictures1(!showpictures1);
    } else {
      setShowpictures2(!showpictures2);
    }
    if (!pictures.length) {
      fetchPictures();
    }
  };

  const handleFormatReverse = () => {
    navigate('/generate', {
      state: { city, cityId },
    });
  };

  const handleNumberChange = () => {
    navigate('/generate1vertical', {
      state: { city, cityId },
    });
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageNumber: 1 | 2,
  ) => {
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
            if (imageNumber === 1) {
              setCustomImage1(result.data.urls[0]);
            } else {
              setCustomImage2(result.data.urls[0]);
            }
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
    if (pictures[0] && pictures[1]) {
      setLink1(customImage1 || pictures[0]);
      setLink2(customImage2 || pictures[1]);
    }
  }, [pictures, customImage1, customImage2]);

  const handleGenerate = async () => {
    if (!link1 || !link2) {
      console.error('Links are not ready yet!');
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
      link2,
      component: 'VerticalImage',
    };

    try {
      setIsGenerating(true);
      console.log(imageProps);
      console.log(JSON.stringify(imageProps));
      const result = await axios.post(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/generate-postcard`,
        imageProps,
      );
      const generatedImage = result.data;
      setIsGenerated(true);
      setGeneratedImage({
        imageLink: generatedImage.imageLink,
        downloadLink: generatedImage.downloadLink,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const debouncedUpdate = useCallback(
    debounce((values: string) => {
      setDebouncedKey(values);
    }, 150),
    [],
  );

  React.useEffect(() => {
    const newKey = `${titleColor}-${fromColor}-${borderColor}-${fromText}-${city}-${customImage1}-${customImage2}`;
    debouncedUpdate(newKey);
  }, [
    fromText,
    titleColor,
    fromColor,
    borderColor,
    city,
    customImage1,
    customImage2,
  ]);

  if (isGenerating) return <Wrapper> LOADING </Wrapper>;

  return (
    <>
      <Wrapper>
        {isGenerated ? (
          <a href={generatedImage.downloadLink} target='_blank'>
            <img src={generatedImage.imageLink} style={{ maxHeight: '98vh' }} />
          </a>
        ) : (
          <>
            <Sidebar>
              <CityName>{city}</CityName>
              <InputContainer>
                <label>Upper Image:</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImageUpload(e, 1)}
                />
                <Picturechoice onClick={() => handleOdabirSlike(1)}>
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
                            onClick={() => handlePictureSelect(picture, 1)}
                          />
                        </SingleCard>
                      ))}
                    </Slider>
                  </Cardmap>
                </Cards>
              )}
              <InputContainer>
                <label>Bottom Image:</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImageUpload(e, 2)}
                />
                <Picturechoice onClick={() => handleOdabirSlike(2)}>
                  Select image
                </Picturechoice>
              </InputContainer>
              {showpictures2 && (
                <Cards>
                  <Cardmap>
                    <Slider {...imageSliderSettings}>
                      {pictures.map((picture, index) => (
                        <SingleCard key={index}>
                          <CityPicture
                            key={index}
                            src={picture}
                            alt={`${city}`}
                            onClick={() => handlePictureSelect(picture, 2)}
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
                <ActionButton onClick={handleNumberChange}>1 Image</ActionButton>
                <ActionButton onClick={handleGenerate}>Generate</ActionButton>
              </ButtonsContainer>
            </Sidebar>
            <PlayerContainer>
              <Player
                key={debouncedKey}
                component={VerticalImage}
                compositionWidth={1080}
                compositionHeight={1920}
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
                  customImage2,
                }}
              />
            </PlayerContainer>
          </>
        )}
      </Wrapper>
    </>
  );
};
