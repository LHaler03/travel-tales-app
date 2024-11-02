import { Container, Header, Input, Inputs, Submit, SubmitContainer, Text, Underline } from "./Signup-Login.styled";
import { useState } from "react";

export const Signup = () => {

    const [action, setAction] = useState("Sign Up");
    return (
      <>
        <Container>
            <Header>
                <Text>{action}</Text>
                <Underline></Underline>
            </Header>
            <Inputs>
              <Input>
                <img src="./images/username.png" alt="username" />
                <input type="text" placeholder="Marko Livaja" />
              </Input>
              {action === "Login" ? <div></div> : (
                <Input>
                  <img src="./images/email.png" alt="email" />
                  <input type="email" placeholder="marko.livaja@Hajduk.com" />
                </Input>
              )}
              <Input>
                <img src="./images/password.png" alt="password" />
                <input type="password" placeholder="livaja>petkovic" />
              </Input>
            </Inputs>
            <SubmitContainer>
              <Submit onClick={() => setAction("Sign Up")}>Sign Up</Submit>
              <Submit onClick={() => setAction("Login")}>Login</Submit>
            </SubmitContainer>
        </Container>
      </>
    );
  }