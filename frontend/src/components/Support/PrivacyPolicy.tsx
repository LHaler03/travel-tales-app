import React from 'react';
import {
  SupportContainer,
  Title,
  SubTitle,
  Text,
  SectionContainer,
  EmailLink,
  LinkContainer,
} from './Support.styled';

const PrivacyPolicy: React.FC = () => {
  return (
    <SupportContainer>
      <SectionContainer>
        <Title>Privacy Policy</Title>
        <Text>Last Updated: [21.1.2025.]</Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Introduction</SubTitle>
        <Text>
          Travel Tales is committed to protecting your privacy. This Privacy Policy explains in detail how we collect, use, disclose, and safeguard your information when you visit our website and use our services related to creating, editing, and downloading postcards. We strictly adhere to all applicable data protection laws, including the GDPR.
        </Text>
        <Text>
          By using our website, you agree to the collection and use of information in accordance with this Policy. We encourage you to review this Policy carefully, and if you do not agree with its terms, please refrain from using our Services.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>1. Information We Collect</SubTitle>
        <Text>
          <strong>Personal Information:</strong> We collect data such as your name, email address, username, password, and any other details provided when you register or update your account. This information enables us to manage your account and offer you personalized services.
        </Text>
        <Text>
          <strong>User-Generated Content:</strong> This includes any photos, text, editing settings, or other content that you upload or create as part of your postcards. Such content is stored and processed by our systems to facilitate editing, sharing, and downloading.
        </Text>
        <Text>
          <strong>Technical Data:</strong> We automatically gather technical information such as your IP address, browser type, device information, and usage details through cookies and similar technologies to help us analyze trends and improve our Services.
        </Text>
        <Text>
          Additional details on these collection practices are available upon request, and we may inform you about new types of data we decide to collect in the future.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>2. How We Use Your Information</SubTitle>
        <Text>
          Your data is used to provide and continuously enhance our services, ensure the security of our systems, communicate important updates, and analyze user trends. If you opt in, we may also use your information for marketing purposes such as sending newsletters and promotional materials.
        </Text>
        <Text>
          Our aim is to tailor the user experience to your individual needs while ensuring our website remains secure, reliable, and innovative.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>3. Sharing Your Information</SubTitle>
        <Text>
          We do not sell or lease your personal data to third parties. Your information may only be shared with trusted service providers who assist us in operating our site, or as required by law. All parties with whom we share your data are contractually obligated to maintain its confidentiality.
        </Text>
        <Text>
          Under exceptional circumstances, we may be required to disclose your information to protect the rights, property, or safety of Travel Tales, our users, or others, in accordance with applicable laws.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>4. Data Security</SubTitle>
        <Text>
          We implement reasonable technical and organizational measures designed to protect your data from unauthorized access, loss, or misuse. However, no method of transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </Text>
        <Text>
          We continuously evaluate and update our security protocols to keep your personal information as safe as possible.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>5. Your Rights</SubTitle>
        <Text>
          Under applicable laws, including the GDPR, you have the right to access, update, correct, or request the deletion of your personal data. You can also restrict or object to our processing of your information, or request data portability. To exercise these rights, please contact us at{' '}
          <EmailLink href="mailto:ttalesteam@gmail.com">ttalesteam@gmail.com</EmailLink>.
        </Text>
        <Text>
          If you have any concerns about our handling of your data, you also have the right to contact your local data protection authority.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>6. Cookies</SubTitle>
        <Text>
          We use cookies and similar technologies to improve your browsing experience, analyze site usage, and provide personalized content. By using our website, you consent to the use of cookies in accordance with our Cookie Policy.
        </Text>
        <Text>
          You can manage your cookie settings through your browser if you wish to limit their use.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>7. Changes to This Policy</SubTitle>
        <Text>
          We reserve the right to update or modify this Privacy Policy at any time. All changes will be published on this page with an updated effective date. It is important that you review this Policy periodically.
        </Text>
        <Text>
          Your continued use of our Services after any modifications signifies your acceptance of the updated Policy.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>8. Contact Information</SubTitle>
        <Text>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:{' '}
          <EmailLink href="mailto:ttalesteam@gmail.com">ttalesteam@gmail.com</EmailLink>. We are dedicated to addressing your inquiries and ensuring transparency regarding our data practices.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Legal & Privacy Links</SubTitle>
        <LinkContainer>
          <a href="/termsOfService">Terms of Service</a>
          <a href="/privacyPolicy">Privacy Policy</a>
        </LinkContainer>
      </SectionContainer>
    </SupportContainer>
  );
};

export default PrivacyPolicy;
