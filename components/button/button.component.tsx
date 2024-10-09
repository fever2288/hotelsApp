import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ButtonContainer, ButtonText } from './button.styles';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  testID?: string;
}

/**
 * Button component that renders a styled button with customizable text.
 * It  handles the press event using the provided onPress function.
 *
 * @param {ButtonProps} props - The properties for the Button component.
 * @param {string} props.text - The text to display inside the button.
 * @param {function} props.onPress - Callback function triggered when the button is pressed.
 * @param {string} [props.testID] - Optional test ID for testing purposes.
 *
 * @extends TouchableOpacityProps - This component extends React Native's TouchableOpacityProps for additional configuration.
 *
 * @returns {JSX.Element} A styled button component.
 */
const Button: React.FC<ButtonProps> = ({ text, onPress, testID }) => {
  return (
    <ButtonContainer onPress={onPress} testID={testID}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
