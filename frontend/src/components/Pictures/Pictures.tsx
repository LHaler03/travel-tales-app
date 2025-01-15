import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CityPicture } from './Pictures.styled';

type City = {
  city: string;
};

const Pictures: React.FC<City> = ({ city }) => {
  const [pictures, setPictures] = useState<string[]>([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/${city}`,
        );
        setPictures(response.data);
      } catch (error) {
        console.error(`Error fetching pictures for ${city}:`, error);
      }
    };

    fetchPictures();
  }, []);

  return (
    <>
      {pictures.map((picture, index) => (
        <CityPicture key={index} src={picture} alt={`${city}`} />
      ))}
    </>
  );
};

export default Pictures;
