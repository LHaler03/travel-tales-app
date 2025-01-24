import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  padding-top: 2rem;
  min-height: 100vh;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SubHeader = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  max-width: 800px;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
`;

export const DashboardLink = styled.button`
  background-color: #0077ff;
  color: #fff;
  border: none;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: #005fcc;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem;
  }
`;
