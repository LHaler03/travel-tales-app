import styled from 'styled-components';

export const Title = styled.h1`
  text-align: center;
  margin: 20px 0;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-items: center;
  padding: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
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
`;

export const ModalImage = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ApproveButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
`;

export const DisapproveButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
`;
