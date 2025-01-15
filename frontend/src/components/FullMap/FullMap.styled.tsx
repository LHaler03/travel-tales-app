import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

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
  border-radius: 20px;
  background-color: #b5cfe3;
  border: 2px solid #696969;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }

  @media (min-width: 600px) {
    display: block;
    padding: 30px;

    p {
      margin-bottom: 0px;
      text-align: left;
    }
  }
`;

export const CityTitle = styled.h1`
  text-align: center;
  margin-bottom: 2%;
  font-size: 1.5rem;
  @media (min-width: 600px) {
    font-size: 3rem;
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
  font-size: 25px;
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
`;

export const CityPicture = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;

  @media (min-width: 1024px) {
    width: 400px;
    height: 250px;
  }
`;

export const StyledFaStar = styled(FaStar)`
  font-size: 1.5rem;
  margin: 0 5px;
  margin-bottom: 5px;
  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
`;

export const StyledFaStarHalfAlt = styled(FaStarHalfAlt)`
  font-size: 1.5rem;
  margin: 0 5px;
  margin-bottom: 5px;
  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
`;

export const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StarsTitle = styled.h1`
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

export const Comments = styled.div`
  border-radius: 8px;
  border-width: 1px;
  background-color: white;
  width: 200px;
  height: 100px;
  padding: 10px;
  overflow-y: auto;
  @media (min-width: 1024px) {
    width: 400px;
    height: 75px;
  }
`;

export const Comment = styled.div`
  word-wrap: break-word;
`;
