import styled from 'styled-components';

export const NavbarStyled = styled.nav`
  display: flex;
  postion: fixed;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  background-color: #97bcd8;
  padding: 20px;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Logo = styled.h1`
  margin: 0;
  padding: 0;

  img {
    width: 10rem;
    height: 10rem;
    object-fit: contain;
  }

`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: #5d89d5;
    }
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
