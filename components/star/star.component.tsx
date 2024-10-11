import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'styled-components/native';

import { RowContainer } from './star.styles';

interface StarProps {
  numberOfStars: number;
  isSelected?: boolean;
}

/**
 * Star component renders a row of stars based on the provided number.
 *
 * @param {StarProps} props - The props for the Star component.
 * @param {number} props.numberOfStars - The number of stars to display.
 * @param {boolean} [props.isSelected] - Whether the stars are selected (changes the star color).
 * @returns {JSX.Element} The rendered Star component.
 */
const Star: React.FC<StarProps> = ({ numberOfStars, isSelected = false }) => {
  const theme = useTheme();

  return (
    <RowContainer testID="star-row">
      {Array.from({ length: numberOfStars }, (_, index) => (
        <Icon
          key={index}
          name="star"
          size={15}
          color={isSelected ? theme.colors.primary : theme.colors.secondary}
        />
      ))}
    </RowContainer>
  );
};

export default Star;
