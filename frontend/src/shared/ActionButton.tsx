import React from 'react';
import { StyledButton, ApproveButton as StyledApproveButton, DisapproveButton as StyledDisapproveButton } from './ActionButton.styled';

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

// Export the styled buttons
export const ApproveButton = StyledApproveButton;
export const DisapproveButton = StyledDisapproveButton;
