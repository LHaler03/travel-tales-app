import styled, { keyframes } from 'styled-components';
import { MapContainer } from 'react-leaflet';

const fadeIn = keyframes`
  from {
    opacity: 0; // Start fully transparent
  }
  to {
    opacity: 1; // End fully opaque
  }
`;

export const StyledMapContainer = styled(MapContainer)`
  height: 65vh;
  max-width: 95%;
  margin: auto;
  border-radius: 10px;
  z-index: 10;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #333;
  position: relative;

  @media (min-width: 600px) {
    margin-top: 1.5rem;
    height: 68vh;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(20, 20, 20, 0.55);
  z-index: 2000;
  animation: ${fadeIn} 0.1s ease-in;
`;

export const OverlayText = styled.div`
  z-index: 2001;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  animation: ${fadeIn} 0.1s ease-in;
`;

export const StyledMapWrapper = styled.div``;
