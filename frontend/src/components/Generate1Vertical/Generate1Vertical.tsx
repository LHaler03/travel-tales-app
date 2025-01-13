import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@remotion/player';
import { Vertical1Image } from '../../../remotion/Vertical1Image';
import { CityName, PlayerContainer, Wrapper, Sidebar } from '../GenerateVertical/GenerateVertical.styled';
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { ActionButton } from '../../shared/ActionButton';

export const Generate1Vertical = () => {
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

  const handleFormatReverse = () => {
    navigate('/generate1', {
        state: { city: city},
      });
  };

  const handleNumberChange = () => {
    navigate('/generatevertical', {
        state: { city: city},
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
    []
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
                <div>
                    <label>Image:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                    />
                </div>
                <div>
                    <label>Title Color:</label>
                    <input 
                        type="color" 
                        value={titleColor} 
                        onChange={(e) => setTitleColor(e.target.value)} 
                    />
                </div>
                <div>
                    <label>From Text Color:</label>
                    <input 
                        type="color" 
                        value={fromColor} 
                        onChange={(e) => setFromColor(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Border Color:</label>
                    <input 
                        type="color" 
                        value={borderColor} 
                        onChange={(e) => setBorderColor(e.target.value)} 
                    />
                </div>
                <div>
                    <label>From Text:</label>
                    <input 
                        type="text" 
                        value={fromText} 
                        onChange={(e) => setFromText(e.target.value)} 
                    />
                </div>
                <ActionButton onClick={handleFormatReverse}>Reverse Format</ActionButton>
                <ActionButton onClick={handleNumberChange}>2 Images</ActionButton>
                <ActionButton>Generate</ActionButton>
            </Sidebar>
            <PlayerContainer>
                <Player
                    key={debouncedKey}
                    component={Vertical1Image}
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
                    }}
                />
            </PlayerContainer>
        </Wrapper>
    </>
  );
}