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
  width: 100vw;
  overflow: hidden;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 20rem;
  height: 17rem;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
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

