import React from 'react';
import { StyledButton } from './ActionButton.styled';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
}) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
