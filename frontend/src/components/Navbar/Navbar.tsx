import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Overlay,
} from './Navbar.styled';
import { ActionButton } from '../../shared/ActionButton';
import traveltales_black from '/images/traveltales_black.png';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery('(min-width: 1200px)');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // Debug logging
  useEffect(() => {
    console.log('Navbar - isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const handleClose = () => {
    setIsMenuToggled(false);
  };

  const handleLogin = () => {
    navigate('/login', { state: { redirectTo: location.pathname === '/register' ? '/' : location.pathname } });
  };

  const handleRegister = () => {
    navigate('/register', { state: { redirectTo: location.pathname === '/login' ? '/' : location.pathname } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarStyled>
      {(!isMenuToggled || isAboveMediumScreens) && (
        <Logo>
          <Link to='/'>
            <img src={traveltales_black} alt='Travel Tales' />
          </Link>
        </Logo>
      )}
      {isAboveMediumScreens ? (
        <>
          <NavLinks>
            <Link to='/'>Home</Link>
            <a href='#explore'>Explore</a>
            <a href='#about-us'>About Us</a>
            <a href='#support'>Support</a>
          </NavLinks>
          <ButtonContainer>
            {isAuthenticated ? (
              <>
                <ActionButton onClick={() => navigate('/profile')}>My Profile</ActionButton>
                <ActionButton onClick={handleLogout}>Sign Out</ActionButton>
              </>
            ) : (
              <>
                <ActionButton onClick={handleLogin}>Login</ActionButton>
                <ActionButton onClick={handleRegister}>Register</ActionButton>
              </>
            )}
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
        <>
          <Overlay onClick={handleClose} />
          <Sidebar>
            <div className='sidebar-header'>
              <Logo>
                <Link to='/'>
                  <img src={traveltales_black} alt='Travel Tales' />
                </Link>
              </Logo>
              <CloseIcon onClick={handleClose}>
                <XMarkIcon />
              </CloseIcon>
            </div>
            <Divider />
            <MenuItems>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuToggled(false)}>
                    My Profile
                  </Link>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setIsMenuToggled(false);
                    handleLogout();
                  }}>
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                  <a href="#" onClick={(e) => { 
                    e.preventDefault(); 
                    setIsMenuToggled(false); 
                    handleLogin(); 
                  }}>
                    Login
                  </a>
                  <a href="#" onClick={(e) => { 
                    e.preventDefault(); 
                    setIsMenuToggled(false); 
                    handleRegister(); 
                  }}>
                    Register
                  </a>
                </>
              )}
              <Link to="/" onClick={() => setIsMenuToggled(false)}>
                Home
              </Link>
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
        </>
      )}
    </NavbarStyled>
  );
};
