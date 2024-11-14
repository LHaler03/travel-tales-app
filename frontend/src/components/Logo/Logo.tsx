import { LogoStyled } from './Logo.styled';
import { useAuth } from '../../context/AuthContext';
import { RedirectLink } from '../../shared/Signup-Login.styled';

export const Logo = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <LogoStyled>
          <h1>Welcome, {user?.username}!</h1>
        </LogoStyled>
      </>
    );
  }

  return (
    <>
      <LogoStyled>
        <h1>Welcome to Travel Tales!</h1>
        <h2>
          Start your journey across the globe with us,{' '}
          <RedirectLink href='/login'>log in</RedirectLink> or{' '}
          <RedirectLink href='/register'>register</RedirectLink> to get the full experience!
        </h2>
        {/* <img src='./images/traveltales_black.png' alt='Travel Tales'></img> */}
      </LogoStyled>
    </>
  );
};
