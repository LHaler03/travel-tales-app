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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  width: 100%;
  cursor: pointer;
`;

export const PostcardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 1000;
`;

export const ModalImage = styled.img`
  max-width: calc(100% - 40px);
  max-height: calc(100% - 100px);
  object-fit: contain;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  position: absolute;
  bottom: 1rem;
  gap: 2rem;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
