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

export const HorizontalImage: React.FC<z.infer<typeof ImageSchema>> = ({
  fromText: text1,
  titleColor: color1,
  fromColor: color2,
  borderColor: color3,
}) => {
    const [pictures, setPictures] = useState<string[]>([]);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageHeight2, setImageHeight2] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);

    const cityName = 'Reykjavik'

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

    const handleImageLoad2 = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const height = event.currentTarget.naturalHeight;
      const width = event.currentTarget.naturalWidth;
      setImageWidth(width);
      setImageHeight2(height)
    };

    React.useEffect(() => {
        fetchPictures(cityName);
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
           onLoad={handleImageLoad2}  
           style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            height: imageWidth / imageHeight2 * 1080 >= 1510 ? '100%' : 'auto', 
            width: imageWidth / imageHeight2 * 1080 >= 1510 ? 'auto' : '1510px', 
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
            }}>{cityName}</div>
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
