import { useState } from 'react';
import {
  NavbarStyled,
  NavLinks,
  Logo,
  ButtonContainer,
  Sidebar,
  Divider,
  HamburgerIcon,
  CloseIcon,
  MenuItems,
} from './Navbar.styled';
import { ActionButton } from '../../shared/ActionButton';
import traveltales_black from '/images/traveltales_black.png';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery('(min-width: 1200px)');
  const navigate = useNavigate();

  return (
    <NavbarStyled>
      {(!isMenuToggled || isAboveMediumScreens) && (
        <Logo>
          <a href='/'>
            <img src={traveltales_black} alt='Travel Tales' />
          </a>
        </Logo>
      )}
      {isAboveMediumScreens ? (
        <>
          <NavLinks>
            <a href='#home'>Home</a>
            <a href='#explore'>Explore</a>
            <a href='#about-us'>About Us</a>
            <a href='#support'>Support</a>
          </NavLinks>
          <ButtonContainer>
            <ActionButton onClick={() => navigate('/login')}>
              Login
            </ActionButton>
            <ActionButton onClick={() => navigate('/register')}>
              Register
            </ActionButton>
          </ButtonContainer>
        </>
      ) : (
        !isMenuToggled && (
          <HamburgerIcon onClick={() => setIsMenuToggled(!isMenuToggled)}>
            <Bars3Icon />
          </HamburgerIcon>
        )
      )}

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <Sidebar>
          <div className='sidebar-header'>
            <Logo>
              <a href='/'>
                <img src={traveltales_black} alt='Travel Tales' />
              </a>
            </Logo>
            <CloseIcon onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon />
            </CloseIcon>
          </div>
          <Divider />
          {/* MENU ITEMS */}
          <MenuItems>
            <a href='/login' onClick={() => setIsMenuToggled(false)}>
              Login
            </a>
            <a href='/register' onClick={() => setIsMenuToggled(false)}>
              Register
            </a>
            <a href='#explore' onClick={() => setIsMenuToggled(false)}>
              Explore
            </a>
            <a href='#about-us' onClick={() => setIsMenuToggled(false)}>
              About Us
            </a>
            <a href='#support' onClick={() => setIsMenuToggled(false)}>
              Support
            </a>
          </MenuItems>
        </Sidebar>
      )}
    </NavbarStyled>
  );
};
