import CityInfo from '../../components/CityInfo/CityInfo';
import { useLocation } from 'react-router-dom';
import { Player } from '@remotion/player';
import { HorizontalImage } from '../../../remotion/HorizontalImage';
import { PlayerContainer } from './Generate.styled';

export const Generate = () => {
  const location = useLocation();
  const { city, geocode } = location.state || {
    city: 'Default City',
    geocode: null,
  };

  return (
    <>
      <CityInfo city={city} geocode={geocode} />
      <PlayerContainer>
        <Player
            component={HorizontalImage}
            compositionWidth={1920}
            compositionHeight={1080}
            durationInFrames={1}
            fps={30}
            style={{
                width: '100%'
            }}
            inputProps={{
                fromText: "travel tales",
                titleColor: "#000000",
                fromColor: "#000000",
                borderColor: "#ffffff",
                cityName: city
            }}
        />
      </PlayerContainer>
    </>
  );
}