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

export const PostcardSection = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  text-align: center; 
`;

export const PostcardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Postcard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #f0f0f0;
`;

export const PostcardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
`;
