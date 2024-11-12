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
} from '../../shared/Signup-Login.styled';
import React from 'react';
import { useState } from 'react';
import { LoggedUser } from '../../types/User';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth, UserType } from '../../context/AuthContext';
import { ActionButton } from '../../shared/ActionButton';
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

  const { login, googleLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5185/api/account/login';
      const response = await axios.post(url, formData);
      const token = response.data.token;
      const user: UserType = {
        username: response.data.username,
      };
      login(token, user); // Set authenticated state
      navigate(redirectTo); // Navigate after successful login
    } catch (error) {
      console.error(error);
      setErrorMessage('Incorrect username and/or password!');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (response) => {
      try {
        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userInfo = userInfoResponse.data;
        
        await googleLogin({
          access_token: response.access_token,
          userInfo: {
            given_name: userInfo.given_name,
            family_name: userInfo.family_name,
            email: userInfo.email,
            picture: userInfo.picture
          }
        });

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
            <SubmitContainer>
              <ActionButton onClick={() => handleGoogleLogin()}>
                Continue with Google
              </ActionButton>
            </SubmitContainer>
          </StyledForm>
        </Container>
      </Wrapper>
    </>
  );
};
