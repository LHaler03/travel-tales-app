import React, { useState } from 'react';
import { Img, staticFile } from 'remotion'
import { loadFont } from "@remotion/google-fonts/Nunito";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import axios from 'axios';

const { fontFamily } = loadFont();

export const ImageSchema = z.object({
  fromText: z.string(),
  titleColor: zColor(),
  fromColor: zColor(),
  borderColor: zColor(),
});

export const TestImage: React.FC<z.infer<typeof ImageSchema>> = ({
  fromText: text1,
  titleColor: color1,
  fromColor: color2,
  borderColor: color3,
}) => {
    const [pictures, setPictures] = useState<string[]>([]);
    const [imageHeight, setImageHeight] = useState(0);

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

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageHeight(event.currentTarget.offsetHeight);
    };

    React.useEffect(() => {
        fetchPictures('Reykjavik');
    }, []);

    const imageSource1 = pictures[0] || staticFile("images/white.avif");
    const imageSource2 = pictures[1] || staticFile("images/white.avif");

    return (
       <div 
          style={{ 
            position: 'relative', 
            width: '1920px', 
            height: '1080px', 
            overflow: 'hidden', 
            border: `12px solid ${color3}` 
          }}>
         <Img 
           src={imageSource1} 
           style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            height: '100%', 
            width: 'auto', 
            objectFit: 'cover' 
          }} 
         />
         <div 
            style={{
              position: 'absolute',
              top: 'auto',
              bottom: 0,
              right: 0,
              width: '1600px',
              height: '100%',
              clipPath: 'polygon(76% 0%, 100% 0%, 100% 100%, 0% 100%)',
              backgroundColor: color3
            }} />
         <Img 
           src={imageSource2}
           onLoad={handleImageLoad} 
           style={{ 
            position: 'absolute', 
            bottom: 0, 
            right: 0, 
            height: imageHeight || 1080, 
            width: '1584px', 
            objectFit: 'cover', 
            clipPath: 'polygon(79% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }} 
         />
         <div id="upperbox" 
            style={{
              position: 'absolute', 
              top: 0, 
              left: 0, 
              padding: '35px', 
              background: 'rgba(255, 255, 255, 0.4)'
            }}>
          <div 
            style={{
              fontSize: '70px', 
              margin: '20px', 
              fontWeight: 'bold', 
              fontFamily: 'Nunito, sans-serif',
              color: color1
            }}>Reykjavik</div>
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
