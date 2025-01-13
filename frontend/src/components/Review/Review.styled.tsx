import styled from 'styled-components';

export const City = styled.h1`
  text-align: center;
  font-size: 3rem;
  @media (min-width: 600px) {
    font-size: 5rem;
  }
`;

export const FormContainer = styled.div`
  max-width: 500px
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputContainer = styled.div`
  max-width: 75px;
`;

export const Rating = styled.input`
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  min-height: 20px;
  width: 100%;
`;

export const Comment = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  min-height: 100px;
  resize: vertical;
`;

export const SubmitButton = styled.button`
  border-radius: 8px;
  border-width: 1px;
  background-color: #7ea1de;
  color: white;
  cursor: pointer;
  width: 100px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;
