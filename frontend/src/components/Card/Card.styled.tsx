import styled from 'styled-components';

export const Cards = styled.div`
  width: 80%;
  margin: auto;

  .slick-slide > div {
    margin: 0 10px;
  }
`;

export const Cardmap = styled.div`
  margin-top: 20px;
`;

export const SingleCard = styled.div`
  background-color: white;
  height: 100px;
  border-radius: 50px;
`;

export const Picture = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #7ea1de;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
  }
`;

export const City = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
