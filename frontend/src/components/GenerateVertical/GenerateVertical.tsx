import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@remotion/player';
import { VerticalImage } from '../../../remotion/VerticalImage';
import { CityName, PlayerContainer, Wrapper, Sidebar, ButtonsContainer, InputContainer } from './GenerateVertical.styled';
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { ActionButton } from '../../shared/ActionButton';

export const GenerateVertical = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {
    city: 'Default City',
  };

  const [titleColor, setTitleColor] = useState("#000000");
  const [fromColor, setFromColor] = useState("#000000");
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [fromText, setFromText] = useState("travel tales");
  const [debouncedKey, setDebouncedKey] = useState('');
  const [customImage1, setCustomImage1] = useState<string>('');
  const [customImage2, setCustomImage2] = useState<string>('');

  const handleFormatReverse = () => {
    navigate('/generate', {
        state: { city: city},
      });
  };

  const handleNumberChange = () => {
    navigate('/generate1vertical', {
        state: { city: city},
      });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (imageNumber === 1) {
            setCustomImage1(reader.result);
          } else {
            setCustomImage2(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const debouncedUpdate = useCallback(
    debounce((values: string) => {
      setDebouncedKey(values);
    }, 150),
    []
  );

  React.useEffect(() => {
    const newKey = `${titleColor}-${fromColor}-${borderColor}-${fromText}-${city}-${customImage1}-${customImage2}`;
    debouncedUpdate(newKey);
  }, [fromText, titleColor, fromColor, borderColor, city, customImage1, customImage2]);

  return (
    <>
        <Wrapper>
            <Sidebar>
                <CityName>{city}</CityName>
                <InputContainer>
                    <label>Upper Image:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 1)}
                    />
                </InputContainer>
                <InputContainer>
                    <label>Bottom Image:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 2)}
                    />
                </InputContainer>
                <InputContainer>
                    <label>Title Color:</label>
                    <input 
                        type="color" 
                        value={titleColor} 
                        onChange={(e) => setTitleColor(e.target.value)} 
                    />
                </InputContainer>
                <InputContainer>
                    <label>From Text Color:</label>
                    <input 
                        type="color" 
                        value={fromColor} 
                        onChange={(e) => setFromColor(e.target.value)} 
                    />
                </InputContainer>
                <InputContainer>
                    <label>Border Color:</label>
                    <input 
                        type="color" 
                        value={borderColor} 
                        onChange={(e) => setBorderColor(e.target.value)} 
                    />
                </InputContainer>
                <InputContainer>
                    <label>From Text:</label>
                    <input 
                        type="text" 
                        value={fromText} 
                        onChange={(e) => setFromText(e.target.value)} 
                    />
                </InputContainer>
                <ButtonsContainer>
                  <ActionButton onClick={handleFormatReverse}>Reverse Format</ActionButton>
                  <ActionButton onClick={handleNumberChange}>1 Image</ActionButton>
                  <ActionButton>Generate</ActionButton>
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
                        width: '100%'
                    }}
                    inputProps={{
                        fromText: fromText, 
                        titleColor: titleColor, 
                        fromColor: fromColor, 
                        borderColor: borderColor,
                        cityName: city,
                        customImage1,
                        customImage2
                    }}
                />
            </PlayerContainer>
        </Wrapper>
    </>
  );
}
