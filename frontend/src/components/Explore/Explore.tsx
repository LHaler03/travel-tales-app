import React from 'react';
import * as S from './Explore.styled';

export const Explore: React.FC = () => {
  const destinations = [
    { id: 1, name: 'Paris', country: 'France' },
    { id: 2, name: 'Rome', country: 'Italy' },
    { id: 3, name: 'Barcelona', country: 'Spain' },
    { id: 4, name: 'Amsterdam', country: 'Netherlands' },
    { id: 5, name: 'Prague', country: 'Czech Republic' },
    { id: 6, name: 'Dubrovnik', country: 'Croatia' },
  ];

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
          <S.DestinationCard key={destination.id}>
            <S.DestinationImage />
            <S.DestinationInfo>
              <S.DestinationName>{destination.name}</S.DestinationName>
              <S.DestinationCountry>{destination.country}</S.DestinationCountry>
            </S.DestinationInfo>
          </S.DestinationCard>
        ))}
      </S.DestinationsGrid>
    </S.ExploreContainer>
  );
};

export default Explore;
