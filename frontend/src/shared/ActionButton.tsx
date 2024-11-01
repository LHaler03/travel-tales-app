import React from 'react';
import { StyledButton } from './ActionButton.styled';

interface ActionButtonProps {
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};
