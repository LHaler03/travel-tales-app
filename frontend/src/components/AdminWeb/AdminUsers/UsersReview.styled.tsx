import styled from 'styled-components';

export const UserList = styled.ul`
  list-style-type: none;
  padding: 2rem;
`;

export const Title = styled.h1`
  padding: 1.3rem;
  padding-bottom: 0;
  font-size: 3rem;
  font-weight: 600;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ostavlja elemente poravnanim u sredini */
  padding: 10px;
  border-bottom: 1px solid black;
  margin-bottom: 10px;

  /* Za mobilne uređaje, umjesto prelaska na column, ostavljamo row
     i možemo, ako je potrebno, smanjiti padding ili margine */
`;

export const RedActionButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 30px;
  padding: 8px 16px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #66aaff;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #0056b3;
    transform: scale(0.95);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 600px) {
    padding: 10px 20px;
    font-size: 16px;
  }

  /* Uklonili smo margin-top jer ne želimo da se gumb pomakne ispod */
`;

export const EmailLink = styled.a`
  color: black;
  text-decoration: none;
  margin-right: 10px; /* Umjesto lijevog margina, koristimo desnu marginu za razmak */
  font-weight: bold; /* Podebljanje email adrese */

  /* Osiguravamo da email zauzme preostali prostor */
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding-left: 2rem;
  padding-right: 3rem;
`;

export const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
  flex-grow: 1;
  max-width: 30rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const SearchButton = styled(RedActionButton)`
  padding: 10px 20px;
  background-color: black;

  &:hover {
    background-color: #555;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #333;
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 600px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

export const ProfileReviewButton = styled(RedActionButton)`
  margin-top: 1rem;
  padding: 10px;
  padding-top: 10rem;

  @media (min-width: 600px) {
    display: none;
  }
`;
