import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const StyledMapContainer = styled(MapContainer)`
  height: 50vh;
  max-width: 90%;
  margin: auto;
  border-radius: 20px;
  z-index: 10;
  margin-top: 3rem;
  margin-bottom: 8rem;
  border: 1px solid #333;
`;
