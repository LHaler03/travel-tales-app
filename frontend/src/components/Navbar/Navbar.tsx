import { useState } from 'react';
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
  const { user } = useAuth();

  const handleClose = () => {
    setIsMenuToggled(false);
  };

  const handleLogin = () => {
    navigate('/login', {
      state: {
        redirectTo: location.pathname === '/register' ? '/' : location.pathname,
      },
    });
  };

  const handleRegister = () => {
    navigate('/register', {
      state: {
        redirectTo: location.pathname === '/login' ? '/' : location.pathname,
      },
    });
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleMyProfile = () => {
    if (user && user.id) {
      navigate(`/single-user-review/${user.id}`);
    } else {
      console.error('User ID is undefined');
    }
  };
  

  console.log('isAuth: ', isAuthenticated);

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
            <Link to='/explore'>Explore</Link>
            <Link to='/about'>About Us</Link>
            <Link to='/support'>Support</Link>
            {/* {user && user.role === 'admin' && (
              <> */}

            {isAuthenticated ? (
              <>
                <Link to='/users-review'>Users Review</Link>
                <Link to='/image-review'>Image Review</Link>
              </>
            ) : null}
          </NavLinks>
          <ButtonContainer>
            {isAuthenticated ? (
              <>
                <ActionButton onClick={handleMyProfile}>
                  My Profile
                </ActionButton>
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
                  <Link
                    to='#'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuToggled(false);
                      handleMyProfile();
                    }}
                  >
                    My Profile
                  </Link>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuToggled(false);
                      handleLogout();
                    }}
                  >
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuToggled(false);
                      handleLogin();
                    }}
                  >
                    Login
                  </a>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuToggled(false);
                      handleRegister();
                    }}
                  >
                    Register
                  </a>
                </>
              )}
              <Link to='/' onClick={() => setIsMenuToggled(false)}>
                Home
              </Link>
              <Link to='/explore' onClick={() => setIsMenuToggled(false)}>
                Explore
              </Link>
              <Link to='/about' onClick={() => setIsMenuToggled(false)}>
                About Us
              </Link>
              <Link to='/support' onClick={() => setIsMenuToggled(false)}>
                Support
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to='/users-review'
                    onClick={() => setIsMenuToggled(false)}
                  >
                    Users Review
                  </Link>
                  <Link
                    to='/image-review'
                    onClick={() => setIsMenuToggled(false)}
                  >
                    Image Review
                  </Link>
                </>
              )}
            </MenuItems>
          </Sidebar>
        </>
      )}
    </NavbarStyled>
  );
};
