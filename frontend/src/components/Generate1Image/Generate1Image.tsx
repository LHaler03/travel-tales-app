import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@remotion/player';
import { Horizontal1Image } from '../../../remotion/Horizontal1Image';
import {
  CityName,
  PlayerContainer,
  Wrapper,
  Sidebar,
  InputContainer,
} from '../Generate/Generate.styled';
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { ActionButton } from '../../shared/ActionButton';
import { ButtonsContainer } from '../Generate/Generate.styled';

export const Generate1Image = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {
    city: 'Default City',
  };

  const [titleColor, setTitleColor] = useState('#000000');
  const [fromColor, setFromColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [fromText, setFromText] = useState('travel tales');
  const [debouncedKey, setDebouncedKey] = useState('');
  const [customImage1, setCustomImage1] = useState<string>('');

  const handleFormatReverse = () => {
    navigate('/generate1vertical', {
      state: { city: city },
    });
  };

  const handleNumberChange = () => {
    navigate('/generate', {
      state: { city: city },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomImage1(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
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
            <ActionButton>Generate</ActionButton>
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
