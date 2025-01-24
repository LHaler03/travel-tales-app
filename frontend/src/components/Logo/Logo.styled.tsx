import styled from 'styled-components';

export const LogoStyled = styled.div`
  text-align: center;
  padding-top: 25px;
  background: #1a1a1ade; 
  h1 {
    color: white;
    font-size: 1.6rem;
    font-weight: 600;
    @media (min-width: 600px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0 1rem;
    display: none;

    @media (min-width: 600px) {
      display: block;
    }
  }

  img {
    width: 90%;
    margin: 0 5%;
  }
`;

export const LinksText = styled.a`
  font-size: 1.1rem;
  color: #4b89dc;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #0056b3;
  }
`;

export const EmailVerificationLetter = styled.div`
  font-size: 1.1rem;
  color: darkred;
  margin: 0% 5%;
`;
