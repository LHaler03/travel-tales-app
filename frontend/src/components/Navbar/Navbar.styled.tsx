import styled from "styled-components";

export const NavbarStyled = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  background-color: #97bcd8;
  padding: 20px;
  width: 100%;
  z-index: 30;
`;

export const Logo = styled.div`
  img {
    width: 10rem;
    height: 10rem;
    object-fit: contain;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: #5d89d5;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: #97bcd8;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 0 30px;
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 40;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    padding: 5px 20px;

  }
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
  padding: 20px;
  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: #5d89d5;
    }
  }
`;

export const Divider = styled.hr`
  border: 0.5px solid #ccc;
  width: 100%;
  margin: 0;
`;

export const HamburgerIcon = styled.button`
  width: 32px;
  height: 32px;
  background-size: contain;
  background-color: #97bcd8;

  border: none;
  cursor: pointer;
  color: white;
  z-index: 50;
`;

export const CloseIcon = styled.button`
  width: 32px;
  height: 32px;
  background-size: contain;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  z-index: 50;
`;