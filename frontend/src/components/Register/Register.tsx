import {
  Container,
  GoogleButton,
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
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ActionButton } from '../../shared/ActionButton';
import { useGoogleLogin } from '@react-oauth/google';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';
  const { register, loginWithGoogle } = useAuth();

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
      await register(formData);
      navigate(redirectTo);
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Error in registration!');
      alert(errorMessage);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse: { code: string }) => {
      try {
        await loginWithGoogle(codeResponse.code);
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
