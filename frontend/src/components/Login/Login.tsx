import {
  Container,
  Header,
  Input,
  InputContainer,
  InputDescription,
  Inputs,
  Question,
  RedirectContainer,
  RedError,
  StyledForm,
  Submit,
  SubmitContainer,
  Text,
  Underline,
  Wrapper,
  GoogleButton,
} from '../../shared/Signup-Login.styled';
import React from 'react';
import { useState } from 'react';
import { LoggedUser } from '../../types/User';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';

  const [formData, setFormData] = useState<LoggedUser>({
    username: '',
    password: '',
  }); //podaci iz forma

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, loginWithGoogle } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Incorrect username and/or password!');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await loginWithGoogle(response.access_token);
        navigate(redirectTo);
      } catch (error) {
        console.error('Google login error:', error);
        setErrorMessage('Error during Google login!');
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      setErrorMessage('Google login failed!');
    },
  });

  return (
    <>
      <Wrapper>
        <Container>
          <StyledForm onSubmit={handleSubmit}>
            <Header>
              <Text>Login</Text>
              <Underline></Underline>
            </Header>
            <Inputs>
              <InputContainer>
                <InputDescription>Username</InputDescription>
                <Input>
                  <input
                    type='text'
                    name='username'
                    placeholder='JohnDoe'
                    onChange={handleChange}
                  />
                </Input>
              </InputContainer>
              <InputContainer>
                <InputDescription>Password</InputDescription>
                <Input>
                  <input
                    type='password'
                    name='password'
                    placeholder='testpw123'
                    onChange={handleChange}
                  />
                </Input>
              </InputContainer>
            </Inputs>
            {errorMessage && <RedError>{errorMessage}</RedError>}
            <RedirectContainer>
              <Question>Don't have an account?</Question>
              <Link to='/register'>Register</Link>
            </RedirectContainer>
            <SubmitContainer>
              <Submit type='submit'>Login</Submit>
            </SubmitContainer>
          </StyledForm>
          <SubmitContainer>
            <GoogleButton onClick={() => handleGoogleLogin()}>
              Continue with Google
            </GoogleButton>
          </SubmitContainer>
        </Container>
      </Wrapper>
    </>
  );
};
