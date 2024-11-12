import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const StyledMapContainer = styled(MapContainer)`
  max-width: 100vw;
  height: 89vh;
  margin: auto;
  border-radius: 20px;
  border: 1px solid #333;
  z-index: 10;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const Modal_content = styled.div`
  position: relative;
  width: 80vw;
  padding: 20px;
  background: white;
  border-radius: 8px;
  h1 {
    text-align: center;
  }
`;

export const Modal_button_close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: black;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const Modal_button_generate = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
