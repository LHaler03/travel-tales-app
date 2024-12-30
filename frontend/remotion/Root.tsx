import React from 'react';
import { Still } from 'remotion';
import { ImageSchema, MyImage } from './Image';
 
export const RemotionRoot: React.FC = () => {
  return (
    <Still
      schema={ImageSchema}
      defaultProps={{
        fromText: 'travel tales',
        titleColor: 'black',
        fromColor: 'black',
        borderColor: 'white',
      }}
      id="MyImage"
      component={MyImage}
      width={1920}
      height={1080}
    />
  );
};