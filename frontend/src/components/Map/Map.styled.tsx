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
  z-index: 10;
  border: 1px solid #333;
  position: relative;
  border-radius: 14px;
  margin: auto;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  padding: 20px;
  box-shadow: rgba(72, 135, 202, 0.8) 0 0 25px 10px;

  @media (min-width: 600px) {
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
