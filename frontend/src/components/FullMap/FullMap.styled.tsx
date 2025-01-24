import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const Wrapper = styled.div`
  height: calc(100vh - 5rem);
`;

export const StyledMapContainer = styled(MapContainer)`
  max-width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #333;
  z-index: 10;
`;

export const StyledFullMapContainer = styled(MapContainer)`
  max-width: 100%;
  height: 100%;
  z-index: 10;
`;
