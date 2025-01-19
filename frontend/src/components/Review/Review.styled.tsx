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

export const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
  @media (min-width: 600px) {
  }
`;

export const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
`;

export const RatingNumbers = styled.div`
  font-size: 1rem;
`;

type RatingProps = {
  select: boolean;
};

export const RatingDots = styled.div<RatingProps>`
  font-size: 3rem;
  color: ${(s) => (s.select ? 'yellow' : 'white')};
  transition: color 0.2s;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
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
  background: #7ea1de;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  vertical-align: middle;
  font-size: 0.9rem;
  margin-top: 20px;
  margin-left: 10px;
  &:hover {
    background: #0056b3;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Error = styled.div`
  color: red;
  font-size: 1rem;
`;

export const Success = styled.div`
  color: green;
  font-size: 2.5rem;
`;

export const ReturnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 95%;
  margin: auto;
  position: relative;
  height: 80vh;
`;

export const Returnbutton = styled.button`
  background: #7ea1de;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  vertical-align: middle;
  font-size: 0.9rem;
  margin-top: 20px;
  &:hover {
    background: #0056b3;
  }
`;
