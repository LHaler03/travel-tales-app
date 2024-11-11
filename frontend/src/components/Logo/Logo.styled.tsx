import styled from 'styled-components';

export const LogoStyled = styled.nav`
  text-align: center;
  margin-top: 30px;

  h1,
  h2 {
    @media (max-width: 600px) {
      display: none;
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0 1rem;
  }

  img {
    width: 90%;
    margin: 0 5%;
  }
`;
