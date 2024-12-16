import React from 'react';
import { Img, staticFile } from 'remotion'

export const MyImage = () => {
    return (
       <div style={{ position: 'relative', width: '900px', height: '472px', overflow: 'hidden' }}>
         <Img 
           src={staticFile("images/1.avif")} 
           style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 'auto', objectFit: 'cover' }} 
         />
         <div style={{
            position: 'absolute',
            top: 0,
            left: '262px',
            width: '100%',
            height: '100%',
            clipPath: 'polygon(48% 0%, 100% 0%, 100% 100%, 0% 100%)',
            backgroundColor: 'white',
         }} />
         <Img 
           src={staticFile("images/2.jpg")} 
           style={{ position: 'absolute', top: 0, left: '272px', height: '100%', width: 'auto', objectFit: 'cover', clipPath: 'polygon(63% 0%, 100% 0%, 100% 100%, 0% 100%)' }} 
         />
         <div id="upperbox" style={{position: 'absolute', top: 0, left: 0, width: '270px', height: '110px', background: 'white', opacity: '30%'}}/>
         <h2 style={{position: 'absolute', top: '5px', left: '30px', fontFamily: 'Roboto, sans-serif'}}>Berlin</h2>
         <h3 style={{position: 'absolute', top: '40px', left: '30px', fontFamily: 'Roboto, sans-serif'}}>from: Kristijan Šagovac</h3>
       </div>
    );
   }