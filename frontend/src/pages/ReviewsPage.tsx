import { useLocation } from 'react-router-dom';
import { Review } from '../components/Review/Review';

function ReviewsPage() {
  const location = useLocation();
  const { city, id } = location.state || {
    city: 'Default City',
    geocode: null,
  };
  return (
    <>
      <Review city={city} locationId={id} />
    </>
  );
}

export default ReviewsPage;
