import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1rem; /* Adjust as needed to bring content closer to navbar */
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #0077ff;
    outline: none;
  }
`;

export const FileInput = styled.input`
  padding: 0.5rem 0;
  font-size: 1rem;
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Button = styled.button`
  background-color: #0077ff;
  color: #fff;
  padding: 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #005fcc;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem;
  }
`;

export const Search = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  margin-bottom: 0.5rem;
  width: 190px;
  @media (min-width: 600px) {
    width: 500px;
  }
  &:focus {
    border-color: #0077ff;
    outline: none;
  }
`;

export const Success = styled.div`
  color: green;
  font-size: 2.5rem;
`;

export const Error = styled.div`
  color: red;
  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
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

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;
