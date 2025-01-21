import { useNavigate } from 'react-router-dom';
import * as S from './Explore.styled';

export const Explore: React.FC = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      picture:
        'https://s3-travel-tales.s3.eu-central-1.amazonaws.com/valid/Paris/1.jpg?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYQNJSW3J6YSOEOJY%2F20250121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250121T143243Z&X-Amz-SignedHeaders=host&X-Amz-Signature=8fc89be1cce8276ae2c9fce43dc46048793727a9a54dc6b8949b5b53e3fde5e6',
    },
    {
      id: 4,
      name: 'Rome',
      country: 'Italy',
      picture:
        'https://s3-travel-tales.s3.eu-central-1.amazonaws.com/valid/Rome/1.jpg?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYQNJSW3J6YSOEOJY%2F20250121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250121T143555Z&X-Amz-SignedHeaders=host&X-Amz-Signature=97df87752ffa9c3e176fce9e30fdb981660022383c698c694e8484ca4440a99c',
    },
    {
      id: 13,
      name: 'Barcelona',
      country: 'Spain',
      picture:
        'https://s3-travel-tales.s3.eu-central-1.amazonaws.com/valid/Barcelona/1.jpg?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYQNJSW3J6YSOEOJY%2F20250121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250121T143642Z&X-Amz-SignedHeaders=host&X-Amz-Signature=22b8f6a5a48464c7ddd379f2136cd096cd52652246b19cfeada5d3e7e35d9b0b',
    },
    {
      id: 15,
      name: 'Amsterdam',
      country: 'Netherlands',
      picture:
        'https://s3-travel-tales.s3.eu-central-1.amazonaws.com/valid/Amsterdam/1.jpg?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYQNJSW3J6YSOEOJY%2F20250121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250121T143702Z&X-Amz-SignedHeaders=host&X-Amz-Signature=0e0e7b034b894967de1a83fd7d4fa50fcdd40fc68d3e350a7e59b41d49cf42fb',
    },
    {
      id: 17,
      name: 'Prague',
      country: 'Czech Republic',
      picture:
        'https://s3-travel-tales.s3.eu-central-1.amazonaws.com/valid/Prague/1.jpg?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYQNJSW3J6YSOEOJY%2F20250121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250121T143724Z&X-Amz-SignedHeaders=host&X-Amz-Signature=8b763152fc7d03efd1e55c3bb59d7379272106e1f708ef861a9ff4952e9243d2',
    },
    {
      id: 6,
      name: 'Dubai',
      country: 'UAE',
      picture:
        'https://s3-travel-tales.s3.eu-central-1.amazonaws.com/valid/Dubai/1.jpg?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYQNJSW3J6YSOEOJY%2F20250121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250121T143753Z&X-Amz-SignedHeaders=host&X-Amz-Signature=c84bdac65388cf55560101cf3d3d1682150ccf6a1d54614a5403630dad6639b4',
    },
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
          <S.DestinationCard
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
            <S.DestinationImage
              src={destination.picture}
              alt={destination.name}
            ></S.DestinationImage>
            <S.DestinationName>{destination.name}</S.DestinationName>
            <S.DestinationCountry>{destination.country}</S.DestinationCountry>
          </S.DestinationCard>
        ))}
      </S.DestinationsGrid>
    </S.ExploreContainer>
  );
};

export default Explore;
