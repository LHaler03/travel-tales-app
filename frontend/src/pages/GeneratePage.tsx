import CityInfo from '../components/CityInfo/CityInfo';
import { useLocation } from 'react-router-dom';
import Pictures from '../components/Pictures/Pictures';

function GeneratePage() {
  const location = useLocation();
  const { city, geocode } = location.state || {
    city: 'Default City',
    geocode: null,
  };

  return (
    <>
      <CityInfo city={city} geocode={geocode} />
      <Pictures city={city} />
    </>
  );
}

export default GeneratePage;
