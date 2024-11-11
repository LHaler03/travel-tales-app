import { LogoStyled } from './Logo.styled';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const Logo = () => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, don't render the logo section
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <LogoStyled>
        <h1>Welcome to Travel Tales!</h1>
        <h2>
          Start your journey across the globe with us,{' '}
          <Link to='/login'>log in</Link> or{' '}
          <Link to='/register'>register</Link> to get the full experience!
        </h2>
        {/* <img src='./images/traveltales_black.png' alt='Travel Tales'></img> */}
      </LogoStyled>
    </>
  );
};
