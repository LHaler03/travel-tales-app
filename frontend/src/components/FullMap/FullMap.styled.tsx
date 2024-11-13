import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const Wrapper = styled.div`
  height: calc(100vh - 5rem);
`

export const StyledMapContainer = styled(MapContainer)`
  max-width: 100%;
  height: 100%;
  border-radius: 10px;
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
  padding: 30px;
  border-radius: 20px;
  background-color: #b5cfe3;
  border: 2px solid #696969;
  h1 {
    text-align: center;
    margin-bottom: 5%;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    p {
      margin-bottom: 10px;
      width: 100%;
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
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: #7ea1de;
  border: 1px solid #696969;
  &:hover {
    background-color: #5d89d5;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 601px) {
    position: absolute;
    bottom: 10%;
    right: 2%;
  }
`;
