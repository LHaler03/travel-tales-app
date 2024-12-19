import styled from 'styled-components';

export const Cards = styled.div`
  width: 80%;
  margin: auto;
  .slick-slide {
    display: flex;
    justify-content: center;
  }
  .slick-slide > div {
    margin: 0 5px;
  }
`;

export const Cardmap = styled.div`
  margin-bottom: 2rem;
`;

export const SingleCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
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
