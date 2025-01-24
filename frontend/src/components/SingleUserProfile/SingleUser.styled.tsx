import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  gap: 20px;
`;

export const UserInfo = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 8px;

  h1 {
    font-size: 2rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const EmailWarning = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  font-size: 1rem;
  color: #333;
`;

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #007bff;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

export const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const SwitchText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;
