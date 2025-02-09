import styled from 'styled-components';

export const PlayerContainer = styled.div`
  width: 90vw;
  margin: 5vw;

  @media (min-width: 1200px) {
    width: 70vw;
    margin: 5vh 2vw 5vh 4vw;
  }
`;

export const CityName = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  margin: 3vh 0vh 1vh 0vh;

  @media (min-width: 600px) and (max-width: 1199px) {
    font-size: 60px;
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
    width: 98vw;
  }
`;

export const Sidebar = styled.div`
  width: 100vw;

  @media (min-width: 1200px) {
    width: 30vw;
    border-right: 2px solid black;
  }
`;

export const InputContainer = styled.div`
  padding: 5px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  input[type='file'] {
    font-size: 0rem;

    &::file-selector-button {
      background: #7ea1de;
      color: white;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      vertical-align: middle;
      font-size: 0.9rem;

      &:hover {
        background: #0056b3;
      }
    }
  }

  input[type='color'] {
    -webkit-appearance: none;
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 4px;
    padding: 0;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 4px;
    }
  }

  input[type='text'] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }

  @media (min-width: 600px) and (max-width: 1199px) {
    margin-left: 15vw;
    margin-right: 15vw;
    font-size: 1.8rem;
  }
`;

export const ButtonsContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;

  & > button {
    margin: 0.5rem;
    font-size: 0.75rem;
  }

  @media (min-width: 600px) and (max-width: 1199px) {
    & > button {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1200px) {
    flex-direction: column;

    & > button {
      margin: 0.5rem;
      font-size: 1.1rem;
    }
  }
`;

export const Picturechoice = styled.button`
  background: #7ea1de;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  vertical-align: middle;
  font-size: 0.9rem;

  &:hover {
    background: #0056b3;
  }
`;

export const CityPicture = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: 5px;

  @media (min-width: 1024px) {
    width: 300px;
    height: 250px;
  }
`;

export const LoadingText = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-align: center;
`;

export const DisplayedPostcard = styled.img`
  width: 90vw;
  margin: 5vh;

  @media (min-width: 1200px) {
    height: 60vh;
    width: auto;
  }
`;

export const PostcardWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
