import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Explore.styled';

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
      id: 2,
      name: 'Rome',
      country: 'Italy',
      image: '/public/images/Rome.jpeg',
    },
    {
      id: 3,
      name: 'Barcelona',
      country: 'Spain',
      image: '/public/images/Barcelona.jpeg',
    },
    {
      id: 4,
      name: 'Bali',
      country: 'Indonesia',
      image: '/public/images/Bali.jpeg',
    },
    {
      id: 5,
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

  const handleDestinationClick = (destinationName: string) => {
    navigate('/fullmap', { state: { selectedDestination: destinationName } });
  };

  return (
    <S.ExploreContainer>
      <S.ExploreTitle>Explore our top destinations</S.ExploreTitle>
      <S.Text>
        Take a virtual journey through some of the world's most iconic
        destinations! Discover postcards from legendary cities and must-see
        spots that everyone dreams of visiting. Each destination holds unique
        stories, stunning landmarks, and rich cultures. Click through and create
        your own memories from places that inspire.
      </S.Text>
      <S.DestinationsGrid>
        {destinations.map((destination) => (
          <S.DestinationCard
            key={destination.id}
            onClick={() => handleDestinationClick(destination.name)}
          >
            <S.DestinationImage
              src={destination.image}
              alt={destination.name}
            />
            <S.DestinationName>{destination.name}</S.DestinationName>
            <S.DestinationCountry>{destination.country}</S.DestinationCountry>
          </S.DestinationCard>
        ))}
      </S.DestinationsGrid>
    </S.ExploreContainer>
  );
};

export default Explore;
