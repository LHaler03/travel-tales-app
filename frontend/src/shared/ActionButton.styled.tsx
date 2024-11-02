import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: #7ea1de;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5d89d5;
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;
