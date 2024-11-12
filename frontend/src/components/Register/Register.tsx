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
    onSuccess: async (response) => {
      try {
        await googleLogin(response);
        navigate(redirectTo);
      } catch (error) {
        console.error('Google login error:', error);
        setErrorMessage('Error during Google login!');
      }
    },
    onError: () => {
      setErrorMessage('Google login failed!');
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
