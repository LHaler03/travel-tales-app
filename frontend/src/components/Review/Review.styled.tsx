import styled from 'styled-components';

export const City = styled.h1`
  text-align: center;
  font-size: 2, 5rem;
  margin-bottom: 1rem;
  @media (min-width: 600px) {
    font-size: 5rem;
  }
`;

export const FormContainer = styled.div`
  max-width: 95%;
  margin: auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @media (min-width: 600px) {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
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
  color: ${(s) => (s.select ? 'yellow' : 'grey')};
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

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Error = styled.div`
  color: red;
  font-size: 2rem;
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
