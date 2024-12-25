import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const City = styled.h1`
  text-align: center;
  margin-top: 25px;
  margin-bottom: 25px;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    @media (min-width: 600px) {
      font-size: 5rem;
    }
  }
`;

export const InfoMap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid #333;
  margin: 5px;
`;

export const Info = styled.div`
  margin-left: 5px;
`;

export const Country = styled.p`
  margin-bottom: 25px;
  flex-basis: 100%;
`;

export const Continent = styled.p`
  flex-basis: 100%;
  margin-bottom: 25px;
`;

export const Famous = styled.p`
  flex-basis: 100%;
`;

export const Wrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  margin: 5px;
`;

export const StyledMapContainer = styled(MapContainer)`
  max-width: 100%;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #333;
  z-index: 10;
  @media (min-width: 600px) {
    height: 300px;
  }
`;
