import React from 'react';
import { Still } from 'remotion';
import { VerticalImage } from './VerticalImage';
import { HorizontalImage, ImageSchema } from './HorizontalImage';
 
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        schema={ImageSchema}
        defaultProps={{
          fromText: 'travel tales',
          titleColor: 'black',
          fromColor: 'black',
          borderColor: 'white',
          cityName: 'Berlin'
        }}
        id="HorizontalImage"
        component={HorizontalImage}
        width={1920}
        height={1080}
      />

      <Still
        schema={ImageSchema}
        defaultProps={{
          fromText: 'travel tales',
          titleColor: 'black',
          fromColor: 'black',
          borderColor: 'white',
          cityName: 'Berlin'
        }}
        id="VerticalImage"
        component={VerticalImage}
        width={1080}
        height={1920}
      />
    </>
  );
};