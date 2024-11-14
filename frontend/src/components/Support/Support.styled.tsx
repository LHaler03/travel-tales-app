import styled from 'styled-components';

export const SupportContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 1200px) {
    padding: 1rem 0.5rem;
  }
`;

export const SectionContainer = styled.section`
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1200px) {
    margin: 1rem 0;
    padding: 1rem;
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
  
  @media (max-width: 1200px) {
    gap: 1rem;
  }
`;

export const FAQItem = styled.div`
  background: #f8f9fa;
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

export const ContactSection = styled(SectionContainer)`
  background: #f8f9fa;

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
    align-items: center;
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
    
    @media (max-width: 1200px) {
      margin-bottom: 0.4rem;
    }
  }
`;
