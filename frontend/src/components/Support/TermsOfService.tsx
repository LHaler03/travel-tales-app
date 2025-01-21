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

const TermsOfService: React.FC = () => {
  return (
    <SupportContainer>
      <SectionContainer>
        <Title>Terms of Service</Title>
        <Text>Last Updated: [21.1.2025.]</Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>1. Acceptance of Terms</SubTitle>
        <Text>
          By accessing and using the Travel Tales website and our services, you agree to be bound by these Terms of Service. These Terms constitute a legally binding agreement between you and Travel Tales. If you do not agree with any part of these terms, you must refrain from using our Services.
        </Text>
        <Text>
          Your continued use of our Site signifies your acceptance of any modifications to these Terms, which may be updated periodically.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>2. Description of Services</SubTitle>
        <Text>
          Travel Tales provides an online platform where users can create, edit, and download personalized postcards. Users can upload images, customize designs, and share their creations with others. Our aim is to empower creativity while maintaining a safe and engaging online community.
        </Text>
        <Text>
          We continuously strive to improve our Services and may add new features or modify existing ones without prior notice.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>3. User Conduct and Content</SubTitle>
        <Text>
          <strong>User-Generated Content:</strong> You are solely responsible for all content you upload. You agree not to post any content that is provocative, illegal, or that violates the rights of others. Content that is deemed inappropriate, offensive, or otherwise harmful will be removed.
        </Text>
        <Text>
          <strong>License Grant:</strong> By submitting your content, you grant Travel Tales a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, display, and modify your content for the purpose of operating and improving our Services. This license continues for as long as your content remains on our Site.
        </Text>
        <Text>
          We reserve the right to moderate, remove, or modify any content that violates these Terms or our community guidelines.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>4. Prohibited Uses</SubTitle>
        <Text>
          You agree not to use the Site for any unlawful purpose or in any manner that could harm other users or the integrity of the Site. Prohibited actions include, but are not limited to, spamming, phishing, hacking, and posting content that promotes hate speech, violence, or discrimination.
        </Text>
        <Text>
          Any attempt to exploit, manipulate, or compromise the security of our Systems will result in immediate termination of your account, and we reserve the right to notify the proper authorities.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>5. Account Suspension and Termination</SubTitle>
        <Text>
          We reserve the right to immediately suspend or terminate your account and delete all associated content if you violate these Terms or our guidelines. This action may be taken without prior notice, and you will forfeit any rights to use our Services.
        </Text>
        <Text>
          In addition, if you engage in activities that are harmful or disruptive to our community, we may permanently ban your account.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>6. Copyright and Intellectual Property</SubTitle>
        <Text>
          All content on the Site, including text, images, graphics, logos, and software, is protected by copyright and other intellectual property laws. Unauthorized reproduction or distribution of any content is strictly prohibited unless expressly permitted by Travel Tales.
        </Text>
        <Text>
          If you believe that your intellectual property rights have been violated, please contact us immediately.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>7. Disclaimers and Limitation of Liability</SubTitle>
        <Text>
          Our Services are provided "as is" without warranty of any kind, whether express or implied. Travel Tales does not guarantee continuous, uninterrupted access to the Site or that the content is error-free. We will not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use our Services.
        </Text>
        <Text>
          By using our Services, you acknowledge and agree that any reliance on the Site's functionality or content is at your own risk.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>8. Modifications to Terms</SubTitle>
        <Text>
          We may modify these Terms at any time without prior notice. All changes will be posted on this page. Your continued use of our Services after any modifications will constitute your acceptance of the revised Terms.
        </Text>
        <Text>
          It is your responsibility to review these Terms periodically to stay informed about updates.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>9. Governing Law</SubTitle>
        <Text>
          These Terms shall be governed by and construed in accordance with the laws of [Insert State/Region]. Any disputes arising out of these Terms shall be resolved exclusively in the courts located in [Insert City/State].
        </Text>
        <Text>
          By using our Services, you agree to submit to the jurisdiction of these courts.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>10. GDPR and Data Protection</SubTitle>
        <Text>
          We process your personal data in strict accordance with applicable data protection laws, including the GDPR. For detailed information on our data handling practices, please refer to our <EmailLink href="/privacyPolicy">Privacy Policy</EmailLink>.
        </Text>
        <Text>
          Your privacy and data security are of paramount importance to us, and we take all necessary measures to ensure compliance with data protection standards.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>11. Contact</SubTitle>
        <Text>
          For any questions or concerns regarding these Terms, please contact us at:{' '}
          <EmailLink href="mailto:ttalesteam@gmail.com">ttalesteam@gmail.com</EmailLink>.
        </Text>
        <Text>
          We welcome your feedback and are committed to resolving any issues you may have.
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

export default TermsOfService;
