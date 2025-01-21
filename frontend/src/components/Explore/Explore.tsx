import { useNavigate } from 'react-router-dom';
import {
  DestinationCard,
  DestinationCountry,
  DestinationImage,
  DestinationName,
  DestinationsGrid,
  ExploreContainer,
  ExploreTitle,
  Text,
} from './Explore.styled';

export const Explore: React.FC = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      image: '/public/images/Paris.jpeg',
    },
    {
      id: 4,
      name: 'Rome',
      country: 'Italy',
      image: '/public/images/Rome.jpeg',
    },
    {
      id: 13,
      name: 'Barcelona',
      country: 'Spain',
      image: '/public/images/Barcelona.jpeg',
    },
    {
      id: 27,
      name: 'Bali',
      country: 'Indonesia',
      image: '/public/images/Bali.jpeg',
    },
    {
      id: 35,
      name: 'London',
      country: 'England',
      image: '/public/images/London.jpeg',
    },
    {
      id: 6,
      name: 'New York',
      country: 'USA',
      image: '/public/images/Newyork.jpeg',
    },
  ];

  return (
    <ExploreContainer>
      <ExploreTitle>Explore our top destinations</ExploreTitle>
      <Text>
        Take a virtual journey through some of the world's most iconic
        destinations! Discover postcards from legendary cities and must-see
        spots that everyone dreams of visiting. Each destination holds unique
        stories, stunning landmarks, and rich cultures. Click through and create
        your own memories from places that inspire.
      </Text>
      <DestinationsGrid>
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            onClick={() =>
              navigate('/fullmap', {
                state: {
                  locationIdreview: destination.id,
                  city: destination.name,
                  showModalreview: true,
                },
              })
            }
          >
            <DestinationImage src={destination.image} alt={destination.name} />
            <DestinationName>{destination.name}</DestinationName>
            <DestinationCountry>{destination.country}</DestinationCountry>
          </DestinationCard>
        ))}
      </DestinationsGrid>
    </ExploreContainer>
  );
};

export default Explore;
