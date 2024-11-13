import styled from 'styled-components';

export const LogoStyled = styled.nav`
  text-align: center;
  margin-top: 30px;

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    @media (max-width: 600px) {
      font-size: 1.6rem;
    }
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0 1rem;

    @media (max-width: 600px) {
      display: none;
    }
  }

  img {
    width: 90%;
    margin: 0 5%;
  }
`;
