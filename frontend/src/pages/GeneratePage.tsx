import CityInfo from '../components/CityInfo/CityInfo';
import { useLocation } from 'react-router-dom';

function GeneratePage() {
  const location = useLocation();
  const { city, geocode } = location.state || {
    city: 'Default City',
    geocode: null,
  };

  return (
    <>
      <CityInfo city={city} geocode={geocode} />
    </>
  );
}

export default GeneratePage;
