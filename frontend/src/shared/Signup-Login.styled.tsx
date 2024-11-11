import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: 100%;
  margin-top: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin: auto;
  max-width: 90%;
  background-color: #7ea1de;
  border-radius: 20px;
`;

export const StyledForm = styled.form``;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin-top: 25px; 
}
`;

export const Text = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: black;
`;

export const Underline = styled.div`
  width: 60px;
  height: 0.5rem;
  background-color: black;
  border-radius: 10px;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 5px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0% 5%;
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: auto;
  background-color: #b5cfe3;
  border-radius: 6px;
  padding: 5px;

  input {
    background: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    color: black;
    width: 95%;
  }
`;

export const InputDescription = styled.h4``;

export const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 10px 0px 10px;
  padding: 5px;
  gap: 5px;
`;

export const Question = styled.div`
  font-size: 1.1rem;
`;

export const RedirectLink = styled.a`
  font-size: 1.1rem;
`;

export const SubmitContainer = styled.div`
  display: flex;
  margin: 20px auto;
  justify-content: center;
`;

export const Submit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 220px;
  height: 59px;
  color: black;
  background-color: #b5cfe3;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

export const RedError = styled.h4`
  color: red;
  text-align: center;
  margin: 5%;
`