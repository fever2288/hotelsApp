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
