import styled from 'styled-components';

export const ExploreContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const ExploreTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

export const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

export const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const DestinationCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  @media (max-width: 600px) {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    transform: translateY(-5px);

    @media (max-width: 600px) {
      transform: translateY(-3px);
    }
  }
`;

export const DestinationImage = styled.div`
  height: 200px;
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;

  @media (max-width: 600px) {
    height: 180px;
  }
`;

export const DestinationInfo = styled.div`
  padding: 1rem;

  @media (max-width: 600px) {
    padding: 0.8rem;
  }
`;

export const DestinationName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const DestinationCountry = styled.p`
  margin: 0.5rem 0 0;
  color: #666;
`;
