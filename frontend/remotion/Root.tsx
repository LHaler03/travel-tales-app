import React from 'react';
import { Still } from 'remotion';
import { ImageSchema, MyImage } from './Image';
import { VerticalImage } from './VerticalImage';
 
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
        }}
        id="MyImage"
        component={MyImage}
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
        }}
        id="VerticalImage"
        component={VerticalImage}
        width={1080}
        height={1920}
      />
    </>
  );
};