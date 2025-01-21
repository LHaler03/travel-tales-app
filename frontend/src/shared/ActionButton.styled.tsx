import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: #7ea1de;
  border: none;
  border-radius: 30px;
  padding: 8px 16px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #5d89d5;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
    background-color: #4a76c2;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 600px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

export const ApproveButton = styled(StyledButton)`
  background-color: #4caf50;
  &:hover {
    background-color: #45a049;
  }
`;

export const DisapproveButton = styled(StyledButton)`
  background-color: #f44336;
  &:hover {
    background-color: #e53935;
  }
`;

export const ReviewButton = styled(StyledButton)`
  margin: 20px;
`;
