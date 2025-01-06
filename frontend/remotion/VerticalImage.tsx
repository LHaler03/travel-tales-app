import React, { useState } from 'react';
import { Img, staticFile } from 'remotion'
import { loadFont } from "@remotion/google-fonts/Nunito";
import { z } from "zod";
import { ImageSchema } from './Image';
import axios from 'axios';

const { fontFamily } = loadFont();

export const VerticalImage: React.FC<z.infer<typeof ImageSchema>> = ({
  fromText: text1,
  titleColor: color1,
  fromColor: color2,
  borderColor: color3,
}) => {
  const [pictures, setPictures] = useState<string[]>([]);

  const fetchPictures = async (cityName: string) => {
      try {
          const response = await axios.get(
          `http://localhost:5185/api/s3/${cityName}`,
          );
          setPictures(response.data);
      } catch (error) {
          console.log(`Error fetching pictures for ${cityName}:`, error);
      }
  };

  React.useEffect(() => {
      fetchPictures('Berlin');
  }, []);

  const imageSource1 = pictures[0] || staticFile("images/white.avif");
  const imageSource2 = pictures[1] || staticFile("images/white.avif");

    return (
       <div 
          style={{ 
            position: 'relative', 
            width: '1080px', 
            height: '1920px', 
            overflow: 'hidden', 
            border: `20px solid ${color3}` 
          }}>
         <Img 
           src={imageSource1} 
           style={{ 
            position: 'absolute', 
            top: 0, 
            left: '-45%', 
            height: '59%', 
            width: 'auto', 
            objectFit: 'cover' 
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
              backgroundColor: color3
            }} />
         <Img 
           src={imageSource2} 
           style={{ 
            position: 'absolute', 
            bottom: 0, 
            right: '-45%', 
            height: '59%', 
            width: 'auto', 
            objectFit: 'cover', 
            clipPath: 'polygon(0% 25%, 100% 0%, 100% 100%, 0% 100%)'
          }} 
         />
         <div id="upperbox" 
            style={{
              position: 'absolute', 
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '35px', 
              background: 'rgba(255, 255, 255, 0.6)'
            }}>
          <div 
            style={{
              fontSize: '70px', 
              margin: '20px', 
              fontWeight: 'bold', 
              fontFamily: 'Nunito, sans-serif',
              color: color1
            }}>Berlin</div>
          <div 
            style={{
              fontSize: '52px', 
              margin: '20px', 
              fontFamily: 'Nunito, sans-serif',
              color: color2
            }}>from: {text1} </div>
         </div>
       </div>
    );
   }
