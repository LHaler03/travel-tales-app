import styled from 'styled-components';

export const AboutUsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin: 2rem 0 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1.5rem 0 0.8rem;
  }
`;

export const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

export const SectionContainer = styled.section`
  margin: 2rem 0;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    color: #666;
  }
`;
