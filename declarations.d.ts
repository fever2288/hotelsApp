declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module 'react-native-vector-icons/FontAwesome' {
  import { Icon } from 'react-native-vector-icons/Icon';
  export default Icon;
}

declare module 'react-native-image-slider-box' {
  import * as React from 'react';
  import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

  export interface ImageSliderProps {
    images: string[] | number[];
    sliderBoxHeight?: number;
    dotColor?: string;
    inactiveDotColor?: string;
    dotStyle?: StyleProp<ViewStyle>;
    imageLoadingColor?: string;
    autoplay?: boolean;
    circleLoop?: boolean;
    autoplayInterval?: number;
    paginationBoxVerticalPadding?: number;
    resizeMethod?: 'auto' | 'resize' | 'scale';
    resizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
    ImageComponentStyle?: StyleProp<ImageStyle>;
    paginationBoxStyle?: StyleProp<ViewStyle>;
    imageLoadingStyle?: StyleProp<ViewStyle>;
    currentImageEmitter?: (index: number) => void;
  }

  export const SliderBox: React.FC<ImageSliderProps>;
}
