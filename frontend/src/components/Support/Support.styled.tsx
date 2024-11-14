import styled from 'styled-components';

export const SupportContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 2rem;

  @media (max-width: 1200px) {
    padding: 1rem 0.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 1rem;

  @media (max-width: 1200px) {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
    margin-left: 0.5rem;
  }
`;

export const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;

  @media (max-width: 1200px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;

  @media (max-width: 1200px) {
    gap: 1rem;
  }
`;

export const FAQItem = styled.div`
  padding: 1rem;
  border-radius: 6px;

  h4 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;

    @media (max-width: 1200px) {
      font-size: 1rem;
    }
  }

  p {
    color: #666;
    font-size: 1rem;

    @media (max-width: 1200px) {
      font-size: 0.9rem;
    }
  }
`;

export const EmailLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 0.5rem;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TroubleshootingList = styled.ul`
  padding-left: 3rem;
  margin: 1rem 0;

  @media (max-width: 1200px) {
    padding-left: 1.5rem;
    margin: 0.75rem 0;
  }

  li {
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;

    @media (max-width: 600px) {
      margin-bottom: 0.4rem;
    }
  }
`;

export const SectionContainer = styled.div`
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  @media (max-width: 1200px) {
    margin-left: 0.5rem;
    align-items: center;
  }
`;
