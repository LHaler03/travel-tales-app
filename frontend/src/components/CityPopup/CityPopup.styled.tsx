import styled from 'styled-components';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const Popup = styled.div`
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

export const Popup_content = styled.div`
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

export const Popup_button_close = styled.button`
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
  //display: flex;
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
