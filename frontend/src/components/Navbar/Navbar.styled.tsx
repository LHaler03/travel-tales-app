import styled from 'styled-components';

export const NavbarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #97bcd8;
  padding: 20px;
  margin: 0 8px 8px 8px;

  div {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
  }

  button {
    background-color: #7ea1de;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: inherit;
    padding: 5px;

    &:hover {
      background-color: #5d89d5;
    }
  }
`;
