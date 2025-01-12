import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@remotion/player';
import { VerticalImage } from '../../../remotion/VerticalImage';
import { CityName, PlayerContainer, Wrapper, Sidebar } from './GenerateVertical.styled';
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
                <div>
                    <label>Left Image:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 1)}
                    />
                </div>
                <div>
                    <label>Right Image:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 2)}
                    />
                </div>
                <input 
                    type="color" 
                    value={titleColor} 
                    onChange={(e) => setTitleColor(e.target.value)} 
                />
                <input 
                    type="color" 
                    value={fromColor} 
                    onChange={(e) => setFromColor(e.target.value)} 
                />
                <input 
                    type="color" 
                    value={borderColor} 
                    onChange={(e) => setBorderColor(e.target.value)} 
                />
                <input 
                    type="text" 
                    value={fromText} 
                    onChange={(e) => setFromText(e.target.value)} 
                />
                <ActionButton onClick={handleFormatReverse}>Reverse Format</ActionButton>
                <ActionButton>Generate</ActionButton>
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