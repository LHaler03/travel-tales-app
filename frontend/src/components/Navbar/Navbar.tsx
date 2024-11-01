import { NavbarStyled, NavLinks, Logo, ButtonContainer } from './Navbar.styled';
import { ActionButton } from '../../shared/ActionButton';
import traveltales_black from "/images/traveltales_black.png";

export const Navbar = () => {
  return (
    <NavbarStyled>
      <Logo>
        <img src={traveltales_black} alt="Travel Tales Logo" />
      </Logo>
      <NavLinks>
        <a href="#home">Home</a>
        <a href="#explore">Explore</a>
        <a href="#about-us">About Us</a>
      </NavLinks>
      <ButtonContainer>
        <ActionButton>Login</ActionButton>
        <ActionButton>Guest User</ActionButton>
      </ButtonContainer>
    </NavbarStyled>
  );
};
