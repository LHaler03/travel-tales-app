import React from 'react';
import {
  StyledButton,
  ApproveButton as StyledApproveButton,
  DisapproveButton as StyledDisapproveButton,
  ReviewButton as StyledReviewButton
} from './ActionButton.styled';

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

export const ApproveButton = StyledApproveButton;
export const DisapproveButton = StyledDisapproveButton;
export const ReviewButton = StyledReviewButton;
