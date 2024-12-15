import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

export const StyledFaStar = styled(FaStar)`
  cursor: pointer;
  transition: color 200ms;
  font-size: 20px;
  margin: 2px;
  &:hover {
    transform: scale(1.2);
  }
`;

export const StarInput = styled.input`
  display: none;
`;
