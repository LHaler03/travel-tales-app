import React from 'react';
import {
  AboutUsContainer,
  SectionContainer,
  Title,
  SubTitle,
  Text,
  FeatureList,
} from './AboutUs.styled';

const AboutUs: React.FC = () => {
  return (
    <AboutUsContainer>
      <Title>About Us - Travel Tales</Title>
      <Text>
        Welcome to Travel Tales! Imagine capturing the spirit of any city in the
        world and sending it as a personal postcard—quickly, easily, and
        beautifully. Travel Tales is here to help you share your travel memories
        or dreams from wherever you are.
      </Text>

      <SectionContainer>
        <SubTitle>What is Travel Tales?</SubTitle>
        <Text>
          Travel Tales is a platform designed for travelers, explorers, and
          dreamers. With just a few clicks, you can generate a custom postcard
          from any location across the globe, using our interactive map. Whether
          you're reminiscing about a place you love or sending a postcard from a
          city you hope to visit one day, Travel Tales brings these experiences
          to life.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>How Does It Work?</SubTitle>
        <FeatureList>
          <li>
            Choose Your Destination: Go to our map and pick a city anywhere in
            the world.
          </li>
          <li>
            Create Your Postcard: Customize it with images, messages, and other
            unique details.
          </li>
          <li>
            Share with Friends and Family: Download or share your postcard
            instantly.
          </li>
        </FeatureList>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Our Mission</SubTitle>
        <Text>
          At Travel Tales, we believe that every city has a story, and every
          story deserves to be shared. Our goal is to make it easy for you to
          create memories, connect with others, and celebrate the places that
          mean the most to you.
        </Text>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Why Travel Tales?</SubTitle>
        <FeatureList>
          <li>Quick & Simple: Create postcards in just a few steps.</li>
          <li>Personalized Experiences: Add your own photos and messages.</li>
          <li>
            Global Reach: Explore the world map and choose any destination.
          </li>
        </FeatureList>
      </SectionContainer>

      <SectionContainer>
        <SubTitle>Join Us on This Journey</SubTitle>
        <Text>
          Whether you're a frequent traveler or a curious explorer, Travel Tales
          is your companion in sharing memories and dreams. Start creating,
          sharing, and exploring today!
        </Text>
      </SectionContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;
