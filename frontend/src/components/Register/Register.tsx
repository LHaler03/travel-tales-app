import {
  Container,
  Header,
  Input,
  InputContainer,
  InputDescription,
  Inputs,
  Question,
  RedirectContainer,
  StyledForm,
  Submit,
  SubmitContainer,
  Text,
  Underline,
  Wrapper,
} from '../../shared/Signup-Login.styled';
import React from 'react';
import { useState } from 'react';
import { RegisteredUser } from '../../types/User';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth, UserType } from '../../context/AuthContext';
import { ActionButton } from '../../shared/ActionButton';
import { useGoogleLogin } from '@react-oauth/google';


export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';
  const { login, googleLogin } = useAuth();

  const [formData, setFormData] = useState<RegisteredUser>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  }); //podaci iz forma

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const registerUrl = 'http://localhost:5185/api/account/register';
      const registerResponse = await axios.post(registerUrl, formData);
      console.log('Registration successful:', registerResponse.data);

      const loginUrl = 'http://localhost:5185/api/account/login';
      const loginData = {
        username: formData.username,
        password: formData.password,
      };

      const response = await axios.post(loginUrl, loginData);
      console.log('Auto-login successful:', response.data);
      const user: UserType = {
        username: response.data.username,
      };
      login(response.data.token, user);
      navigate(redirectTo);
    } catch (error) {
      console.error('Registration/Login error:', error);
      setErrorMessage('Error in registration!');
      alert(errorMessage);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (response) => {
      try {
        // First, get user info from Google
        const googleUserInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const googleUserInfo = googleUserInfoResponse.data;

        // Update form data with Google user info
        setFormData({
          firstName: googleUserInfo.given_name || '',
          lastName: googleUserInfo.family_name || '',
          username: googleUserInfo.email.split('@')[0] || '', // Using email prefix as username
          email: googleUserInfo.email,
          password: '', // You might want to handle this differently
        });

        // Then proceed with Google login
        await googleLogin(response);
        navigate(redirectTo);
      } catch (error) {
        console.error('Google login error:', error);
        setErrorMessage('Error during Google login!');
      }
    },
    scope: 'email profile', // Request email and profile info
    onError: (errorResponse) => {
      console.error('Google login failed:', errorResponse);
      setErrorMessage('Google login failed. Please try again.');
    },
  });

  return (
    <>
      <Wrapper>
        <Container>
          <StyledForm onSubmit={handleSubmit}>
            <Header>
              <Text>Register</Text>
              <Underline></Underline>
            </Header>
            <Inputs>
              <InputContainer>
                <InputDescription>First Name</InputDescription>
                <Input>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='John'
                    onChange={handleChange}
                  />
                </Input>
              </InputContainer>
              <InputContainer>
                <InputDescription>Last Name</InputDescription>
                <Input>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Doe'
                    onChange={handleChange}
                  />
                </Input>
              </InputContainer>
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
                <InputDescription>E-mail</InputDescription>
                <Input>
                  <input
                    type='email'
                    name='email'
                    placeholder='john.doe@gmail.com'
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
            <RedirectContainer>
              <Question>Already have an account?</Question>
              <Link to='/login'>Log in</Link>

            </RedirectContainer>
            <SubmitContainer>
              <Submit type='submit'>Register</Submit>
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
