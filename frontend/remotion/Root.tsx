import React from 'react';
import { Still } from 'remotion';
import { MyImage } from './Image';
 
export const RemotionRoot: React.FC = () => {
  return (
    <Still
        id="MyImage"
        component={MyImage}
        width={1920}
        height={1080}
    />
  );
};