import React from 'react';
import {
  SupportContainer,
  Title,
  SubTitle,
  Text,
  FAQContainer,
  FAQItem,
  EmailLink,
  LinkContainer,
  SectionContainer,
} from './Support.styled';

const Support: React.FC = () => {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I sign up?',
          a: "Click the 'Sign Up' button in the top right corner and follow the registration process.",
        },
        {
          q: 'How do I log in?',
          a: 'Use your email and password to log in through the login page.',
        },
      ],
    },
    {
      category: 'Features',
      questions: [
        {
          q: 'How do I use the map feature?',
          a: 'Go to the Map section on the Home page and click on the map. You will see various locations marked—select the one you are interested in to create a postcard for that spot.',
        },
        {
          q: 'How can I create a postcard?',
          a: "Select a location and click 'Create Postcard' to start designing.",
        },
      ],
    },
    {
      category: 'Account Management',
      questions: [
        {
          q: 'How do I reset my password?',
          a: "Click 'Forgot Password' on the login page and follow the instructions sent to your email.",
        },
        {
          q: 'How can I update my profile?',
          a: 'Go to Profile Settings to update your information.',
        },
      ],
    },
  ];

  return (
    <SupportContainer>
      <SectionContainer>
        <Title>Welcome to Support</Title>
        <Text>
          Welcome to our support center! Here you'll find answers to common
          questions, helpful guides, and ways to get in touch if you need
          additional assistance.
        </Text>
      </SectionContainer>

      <SubTitle>Frequently Asked Questions</SubTitle>
      <FAQContainer>
        {faqs.map((category) => (
          <SectionContainer key={category.category}>
            <SubTitle>{category.category}</SubTitle>
            {category.questions.map((faq, index) => (
              <FAQItem key={index}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </FAQItem>
            ))}
          </SectionContainer>
        ))}
      </FAQContainer>

      <SectionContainer>
        <SubTitle>Contact Us</SubTitle>
        <Text>
          Need additional help? Reach out to us at:
          <EmailLink href='mailto:ttalesteam@gmail.com'>
            ttalesteam@gmail.com
          </EmailLink>
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Community Support</SubTitle>
        <Text>
          Join our community forum to connect with other users, share
          experiences, and get tips from the community.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Troubleshooting Tips</SubTitle>
        <Text>If you're experiencing technical issues:</Text>
        <Text>
          <li>Clear your browser cache and cookies</li>
          <li>Make sure you're using a supported browser</li>
          <li>Check your internet connection</li>
          <li>Try logging out and back in</li>
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Legal & Privacy</SubTitle>
        <LinkContainer>
          <a href='/terms'>Terms of Service</a>
          <a href='/privacy'>Privacy Policy</a>
        </LinkContainer>
      </SectionContainer>
    </SupportContainer>
  );
};

export default Support;
