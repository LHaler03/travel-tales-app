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
          `http://localhost:5185/api/s3/${city}`,
        );
        //console.log(response.data)
        setPictures(response.data);
      } catch (error) {
        console.log(`Error fetching pictures for ${city}:`, error);
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
