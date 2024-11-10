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
import { LoggedUser } from '../../types/User';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';

  const [formData, setFormData] = useState<LoggedUser>({
    username: '',
    password: '',
  }); //podaci iz forma

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5185/api/account/login';
      const response = await axios.post(url, formData);
      console.log(response.data);
      login(); // Set authenticated state
      navigate(redirectTo); // Navigate after successful login
    } catch (error) {
      console.error(error);
    }
  };

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
            <RedirectContainer>
              <Question>Don't have an account?</Question>
              <Link to='/register'>Register</Link>
            </RedirectContainer>
            <SubmitContainer>
              <Submit type='submit'>Login</Submit>
            </SubmitContainer>
          </StyledForm>
        </Container>
      </Wrapper>
    </>
  );
};
