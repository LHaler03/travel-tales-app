import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const StyledMapContainer = styled(MapContainer)`
  height: 70vh;
  max-width: 95%;
  margin: auto;
  border-radius: 10px;
  z-index: 10;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #333;

  @media (min-width: 601px) {
    margin-top: 1.5rem;
    height: 68vh;
  }
`;
