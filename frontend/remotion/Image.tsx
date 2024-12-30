import React from 'react';
import { Img, staticFile } from 'remotion'
import { loadFont } from "@remotion/google-fonts/Nunito";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

const { fontFamily } = loadFont();

export const ImageSchema = z.object({
  fromText: z.string(),
  titleColor: zColor(),
  fromColor: zColor(),
  borderColor: zColor(),
});

export const MyImage: React.FC<z.infer<typeof ImageSchema>> = ({
  fromText: text1,
  titleColor: color1,
  fromColor: color2,
  borderColor: color3,
}) => {
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
           src={staticFile("images/1.avif")} 
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
              top: 0,
              right: 0,
              width: '85%',
              height: '100%',
              clipPath: 'polygon(78% 0%, 100% 0%, 100% 100%, 0% 100%)',
              backgroundColor: color3
            }} />
         <Img 
           src={staticFile("images/2.jpg")} 
           style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            height: '100%', 
            width: 'auto', 
            objectFit: 'cover', 
            clipPath: 'polygon(80% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }} 
         />
         <div id="upperbox" 
            style={{
              position: 'absolute', 
              top: 0, 
              left: 0, 
              padding: '35px', 
              background: 'rgba(255, 255, 255, 0.3)'
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
              fontSize: '50px', 
              margin: '20px', 
              fontFamily: 'Nunito, sans-serif',
              color: color2
            }}>from: {text1} </div>
         </div>
       </div>
    );
   }
   