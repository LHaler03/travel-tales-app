import { LogoStyled, LinksText, EmailVerificationLetter } from './Logo.styled';
import { useAuth } from '../../context/AuthContext';

export const Logo = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return (
      <>
        <LogoStyled>
          {user.username ? (
            <h1>Welcome, {user?.username}!</h1>
          ) : (
            <h1>Welcome, {user?.email}</h1>
          )}
          {user.emailConfirmed ? (
            <></>
          ) : (
            <EmailVerificationLetter>Please, verify your email. Check your spam folder.</EmailVerificationLetter>
          )}
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
          <LinksText href='/login'>log in</LinksText> or{' '}
          <LinksText href='/register'>register</LinksText> to get the full
          experience!
        </h2>
        {/* <img src='./images/traveltales_black.png' alt='Travel Tales'></img> */}
      </LogoStyled>
    </>
  );
};
