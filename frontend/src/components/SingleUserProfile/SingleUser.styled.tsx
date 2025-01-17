import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  background-color: black; /
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmailWarning = styled.p`
  color: red;
  font-size: 0.9em;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%; 
  margin-top: 3rem; 
`;


