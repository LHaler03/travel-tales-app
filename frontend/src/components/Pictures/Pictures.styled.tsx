import styled from 'styled-components';

export const CityPicture = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin: 5px;

  @media (min-width: 1024px) {
    width: 450px;
    height: 450px;
    margin: 10px;
  }
`;
