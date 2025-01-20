import React from 'react';
import { getInputProps, Still } from 'remotion';
import { VerticalImage } from './VerticalImage';
import { HorizontalImage, ImageSchema } from './HorizontalImage';
import { Horizontal1Image } from './Horizontal1Image';
import { Vertical1Image } from './Vertical1Image';

export const RemotionRoot: React.FC = () => {
  const {
    fromText = 'travel tales',
    titleColor = 'black',
    fromColor = 'black',
    borderColor = 'white',
    city: cityName = 'Berlin',
    link1,
    link2,
  } = getInputProps() as {
    borderColor: string;
    city: string;
    fromText: string;
    fromColor: string;
    link1: string;
    link2: string;
    titleColor: string;
  };

  return (
    <>
      <Still
        schema={ImageSchema}
        defaultProps={{
          fromText,
          titleColor,
          fromColor,
          borderColor,
          cityName,
          customImage1: link1,
          customImage2: link2,
        }}
        id='HorizontalImage'
        component={HorizontalImage}
        width={1920}
        height={1080}
      />

      <Still
        schema={ImageSchema}
        defaultProps={{
          fromText,
          titleColor,
          fromColor,
          borderColor,
          cityName,
          customImage1: link1,
          customImage2: link2,
        }}
        id='VerticalImage'
        component={VerticalImage}
        width={1080}
        height={1920}
      />

      <Still
        schema={ImageSchema}
        defaultProps={{
          fromText,
          titleColor,
          fromColor,
          borderColor,
          cityName,
          customImage1: link1,
        }}
        id='Horizontal1Image'
        component={Horizontal1Image}
        width={1920}
        height={1080}
      />

      <Still
        schema={ImageSchema}
        defaultProps={{
          fromText,
          titleColor,
          fromColor,
          borderColor,
          cityName,
          customImage1: link1,
        }}
        id='Vertical1Image'
        component={Vertical1Image}
        width={1080}
        height={1920}
      />
    </>
  );
};
