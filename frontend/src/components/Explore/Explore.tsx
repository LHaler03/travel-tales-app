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

import Paris from '/public/images/Paris.jpeg';
import Rome from '/public/images/Rome.jpeg';
import Barcelona from '/public/images/Barcelona.jpeg';
import Bali from '/public/images/Bali.jpeg';
import London from '/public/images/London.jpeg';
import NewYork from '/public/images/Newyork.jpeg';

export const Explore: React.FC = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      image: Paris,
    },
    {
      id: 4,
      name: 'Rome',
      country: 'Italy',
      image: Rome,
    },
    {
      id: 13,
      name: 'Barcelona',
      country: 'Spain',
      image: Barcelona,
    },
    {
      id: 27,
      name: 'Bali',
      country: 'Indonesia',
      image: Bali,
    },
    {
      id: 35,
      name: 'London',
      country: 'England',
      image: London,
    },
    {
      id: 6,
      name: 'New York',
      country: 'USA',
      image: NewYork,
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
