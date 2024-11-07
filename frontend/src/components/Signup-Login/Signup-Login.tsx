import { Container, Header, Input, Inputs, Question, RedirectContainer, RedirectLink, StyledForm, Submit, SubmitContainer, Text, Underline, Wrapper } from "./Signup-Login.styled";
import username from "/images/username.png";
import password from "/images/password.png";
import email from "/images/email.png";
import React from "react";
import { useState } from "react";
import { RegisteredUser } from "../../types/User";
import axios from "axios";

export const Signup = ({action}: { action: string }) => {
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
      const url = action === 'register' ? 'http://localhost:5185/api/account/register' : 'http://localhost:5185/api/account/login';
      const submitData = action === 'login' ? 
      { username: formData.username, password: formData.password } : formData;
      const response = await axios.post(url, submitData);
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
                <Text>{action === "login" ? "Login" : "Register"}</Text>
                <Underline></Underline>
            </Header>
            <Inputs>
              {action === "login" ? <></> : (
                <Input>
                  <img src={username} />
                  <input type="text" name="firstName" placeholder="john" onChange={handleChange} />
                </Input>
              )}
              {action === "login" ? <></> : (
                <Input>
                  <img src={username} alt="lastname" />
                  <input type="text" name="lastName" placeholder="Doe" onChange={handleChange}/>
                </Input>
              )}
              <Input>
                <img src={username} alt="username" />
                <input type="text" name="username" placeholder="John Doe" onChange={handleChange}/>
              </Input>
              {action === "login" ? <></> : (
                <Input>
                  <img src={email} alt="email" />
                  <input type="email" name="email" placeholder="john.doe@gmail.com" onChange={handleChange}/>
                </Input>
              )}
              <Input>
                <img src={password} alt="password" />
                <input type="password" name="password" placeholder="testpw123" onChange={handleChange}/>
              </Input>
            </Inputs>
            {action === "login" ? (
              <RedirectContainer>
                <Question>Don't have an account?</Question>
                <RedirectLink href="/register">Register</RedirectLink>
              </RedirectContainer>
            ) : (
              <RedirectContainer>
                <Question>Already have an account?</Question>
                <RedirectLink href="/login">Log in</RedirectLink>
              </RedirectContainer>
            )}
            <SubmitContainer>
              <Submit type="submit"> {/* Change to type="submit" */}
                {action === "login" ? "Login" : "Register"}
              </Submit>
            </SubmitContainer>
          </StyledForm>
        </Container>
      </Wrapper>
    </>
  );
}