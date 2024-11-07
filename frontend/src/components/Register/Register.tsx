import { Container, Header, Input, InputContainer, InputDescription, Inputs, Question, RedirectContainer, RedirectLink, StyledForm, Submit, SubmitContainer, Text, Underline, Wrapper } from "../../shared/Signup-Login.styled";
import React from "react";
import { useState } from "react";
import { RegisteredUser } from "../../types/User";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState<RegisteredUser>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  }); //podaci iz forma

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5185/api/account/register';
      const response = await axios.post(url, formData);
      console.log(response.data);
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
                <Text>Register</Text>
                <Underline></Underline>
            </Header>
            <Inputs>
              <InputContainer>
                <InputDescription>First Name</InputDescription> 
                <Input>
                  <input type="text" name="firstName" placeholder="John" onChange={handleChange} />
                </Input>
              </InputContainer>
              <InputContainer>
                <InputDescription>Last Name</InputDescription>
                <Input>
                  <input type="text" name="lastName" placeholder="Doe" onChange={handleChange}/>
                </Input>
              </InputContainer>
              <InputContainer>
                <InputDescription>Username</InputDescription>
                <Input>
                  <input type="text" name="username" placeholder="JohnDoe" onChange={handleChange}/>
                </Input>
              </InputContainer>
              <InputContainer>
                <InputDescription>E-mail</InputDescription>
                <Input>
                  <input type="email" name="email" placeholder="john.doe@gmail.com" onChange={handleChange}/>
                </Input>
              </InputContainer>
              <InputContainer>
                <InputDescription>Password</InputDescription>
                <Input>
                  <input type="password" name="password" placeholder="testpw123" onChange={handleChange}/>
                </Input>
              </InputContainer>
            </Inputs>
            <RedirectContainer>
              <Question>Already have an account?</Question>
              <RedirectLink href="/login">Log in</RedirectLink>
            </RedirectContainer>
            <SubmitContainer>
              <Submit type="submit">Register</Submit>
            </SubmitContainer>
          </StyledForm>
        </Container>
      </Wrapper>
    </>
  );
}