// Navbar.styled.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarStyled = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  background-color: #016FB9;
  padding: 20px;
  width: 100%;
  z-index: 30;
`;

export const Logo = styled.div`
  img {
    width: 10rem;
    height: 100%;
    object-fit: contain;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  transition: all 0.3s ease;

  a {
    text-decoration: none;
    color: white;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: #5d89d5;
      transform: scale(1.1);
    }
  }
`;

export const AdminDashboardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


export const AdminDashboardLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #5d89d5;
    transform: scale(1.1);
  }
`;

export const Badge = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.5em;
  font-size: 0.9rem;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
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
  background-color: #016FB9;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 0 30px;
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 9999;

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
    color: white;
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
  background-color: #016FB9;
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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;
