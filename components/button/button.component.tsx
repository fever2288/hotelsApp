import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ButtonContainer } from './button.styles';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  children: React.ReactNode; // Button content (text, icons, etc.)
  testID?: string; // Add the testID prop
}

/**
 * Button component is a reusable button that accepts press events, children.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {() => void} props.onPress - The function to call when the button is pressed.
 * @param {React.ReactNode} props.children - The content to display inside the button (text, icons, etc.).
 * @param {string} [props.testID] - Optional test identifier for testing.
 * @returns {JSX.Element} The rendered Button component.
 * */
const Button: React.FC<ButtonProps> = ({ onPress, children, testID, ...rest }) => {
  return (
    <ButtonContainer onPress={onPress} testID={testID} {...rest}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
