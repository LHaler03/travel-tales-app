import React, { useState } from 'react';
import { Img, staticFile, continueRender, delayRender } from 'remotion';
import { z } from 'zod';
import axios from 'axios';
import { ImageSchema } from './HorizontalImage';
import { loadFont } from "@remotion/google-fonts/Nunito";

const { fontFamily } = loadFont();

export const Vertical1Image: React.FC<z.infer<typeof ImageSchema>> = ({
  fromText: text1,
  titleColor: color1,
  fromColor: color2,
  borderColor: color3,
  textbgColor: color4,
  cityName,
  customImage1,
}) => {
  const [pictures, setPictures] = useState<string[]>([]);
  const [handle] = useState(() => delayRender());
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const height = event.currentTarget.naturalHeight;
    const width = event.currentTarget.naturalWidth;
    setImageWidth(width);
    setImageHeight(height);
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
    if (customImage1) {
      setPictures([customImage1]);
      continueRender(handle);
    } else {
      fetchPictures(cityName).finally(() => {
        continueRender(handle);
      });
    }
  }, [cityName, customImage1]);

  const imageSource1 = pictures[0] || staticFile('images/white.jpg');

  return (
    <div
      style={{
        position: 'relative',
        width: '1080px',
        height: '1920px',
        overflow: 'hidden',
        border: `12px solid ${color3}`,
      }}
    >
      <Img
        src={imageSource1}
        onLoad={handleImageLoad}
        style={{
          position: 'absolute',
          bottom: 0,
          left:
            (imageWidth * 1920) / imageHeight >= 1080
              ? `-${(((imageWidth * 1920) / imageHeight - 1080) / 1080) * 50}%`
              : 0,
          height: (imageWidth * 1920) / imageHeight >= 1080 ? '1920px' : 'auto',
          width: (imageWidth * 1920) / imageHeight >= 1080 ? 'auto' : '1080px',
          objectFit: 'cover',
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
