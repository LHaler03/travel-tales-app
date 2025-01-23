import React, { useState } from 'react';
import { continueRender, delayRender, Img, staticFile } from 'remotion';
import { z } from 'zod';
import { ImageSchema } from './HorizontalImage';
import axios from 'axios';
import { loadFont } from "@remotion/google-fonts/Nunito";

const { fontFamily } = loadFont();

export const VerticalImage: React.FC<z.infer<typeof ImageSchema>> = ({
  fromText: text1,
  titleColor: color1,
  fromColor: color2,
  borderColor: color3,
  textbgColor: color4,
  cityName,
  customImage1,
  customImage2,
}) => {
  const [pictures, setPictures] = useState<string[]>([]);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageHeight2, setImageHeight2] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageWidth2, setImageWidth2] = useState(0);
  const [handle] = useState(() => delayRender());

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const height = event.currentTarget.naturalHeight;
    const width = event.currentTarget.naturalWidth;
    setImageWidth(width);
    setImageHeight(height);
  };

  const handleImageLoad2 = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const height2 = event.currentTarget.naturalHeight;
    const width2 = event.currentTarget.naturalWidth;
    setImageWidth2(width2);
    setImageHeight2(height2);
  };

  const fetchPictures = async (cityName: string) => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/${cityName}`,
      );
      setPictures(response.data);
    } catch (error) {
      console.error(`Error fetching pictures for ${cityName}:`, error);
    }
  };

  React.useEffect(() => {
    const loadImages = async () => {
      if (customImage1 || customImage2) {
        if (!customImage1 || !customImage2) {
          await fetchPictures(cityName);
        }
        setPictures((currentPictures) => {
          const updatedPictures = [...currentPictures];
          if (customImage1) updatedPictures[0] = customImage1;
          if (customImage2) updatedPictures[1] = customImage2;
          return updatedPictures;
        });
      } else {
        await fetchPictures(cityName);
      }
      continueRender(handle);
    };

    loadImages();
  }, [cityName, customImage1, customImage2]);

  const imageSource1 = pictures[0] || staticFile('images/white.jpg');
  const imageSource2 = pictures[1] || staticFile('images/white.jpg');

  return (
    <div
      style={{
        position: 'relative',
        width: '1080px',
        height: '1920px',
        overflow: 'hidden',
        border: `20px solid ${color3}`,
      }}
    >
      <Img
        src={imageSource1}
        onLoad={handleImageLoad}
        style={{
          position: 'absolute',
          bottom: '41%',
          left: '-45%',
          height:
            imageWidth * ((0.59 * 1920) / imageHeight) >= 1550 ? '59%' : 'auto',
          width:
            imageWidth * ((0.59 * 1920) / imageHeight) >= 1550
              ? 'auto'
              : '1510px',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '56%',
          clipPath: 'polygon(0% 16%, 100% 0%, 100% 100%, 0% 100%)',
          backgroundColor: color3,
        }}
      />
      <Img
        src={imageSource2}
        onLoad={handleImageLoad2}
        style={{
          position: 'absolute',
          top: '41%',
          right: '-45%',
          height:
            imageWidth2 * ((0.59 * 1920) / imageHeight2) >= 1550
              ? '59%'
              : 'auto',
          width:
            imageWidth2 * ((0.59 * 1920) / imageHeight2) >= 1550
              ? 'auto'
              : '1510px',
          objectFit: 'cover',
          clipPath: `polygon(0% ${(imageWidth2 * ((0.59 * 1920) / imageHeight2)) / 70}%, 100% 0%, 100% 100%, 0% 100%)`,
        }}
      />
      <div
        id='upperbox'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '35px',
          background: color4,
          opacity: 0.9,
        }}
      >
        <div
          style={{
            fontSize: '70px',
            margin: '20px',
            fontWeight: 'bold',
            fontFamily: fontFamily,
            color: color1,
          }}
        >
          {cityName}
        </div>
        <div
          style={{
            fontSize: '52px',
            margin: '20px',
            fontFamily: fontFamily,
            color: color2,
          }}
        >
          from: {text1}{' '}
        </div>
      </div>
    </div>
  );
};
