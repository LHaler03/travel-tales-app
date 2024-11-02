import { Container, Header, Input, Inputs, Question, RedirectContainer, RedirectLink, Submit, SubmitContainer, Text, Underline } from "./Signup-Login.styled";

export const Signup = ({action}: { action: string }) => {
  return (
    <>
      <Container>
          <Header>
              <Text>{action === "login" ? "Login" : "Register"}</Text>
              <Underline></Underline>
          </Header>
          <Inputs>
            <Input>
              <img src="./images/username.png" alt="username" />
              <input type="text" placeholder="Marko Livaja" />
            </Input>
            {action === "login" ? <div></div> : (
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
            {action === "login" ? (
              <Submit>Login</Submit>
            ) : (
              <Submit>Register</Submit>
            )}
          </SubmitContainer>
      </Container>
    </>
  );
}