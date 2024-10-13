import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageSourcePropType } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, InfoImage, InfoText, ButtonLabel } from './info.styles';
import Button from '../button/button.component';

interface InfoProps {
  image: ImageSourcePropType;
  text: string;
  isButtonVisible: boolean;
  onButtonClick?: () => void;
  isError?: boolean;
  testID?: string;
}

/**
 * Info component that displays an image, text, and an optional button.
 *
 * @param {InfoProps} props - The properties for the Info component.
 * @param {ImageSourcePropType} props.image - The image to be displayed.
 * @param {string} props.text - The text to be displayed below the image.
 * @param {boolean} props.isButtonVisible - Determines whether the button is visible.
 * @param {function} [props.onButtonClick] - Callback function for button click, required if button is visible.
 * @param {boolean} [props.isError] - If true, the text displays with an error background color.
 * @param {string} [props.testID] - Optional test identifier for testing purposes.
 * @returns {JSX.Element} The rendered Info component.
 */
const Info: React.FC<InfoProps> = ({
  image,
  text,
  isButtonVisible,
  onButtonClick,
  isError = false,
  testID,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container testID={testID || 'info-container'}>
      <InfoImage source={image} testID="info-image" />
      <InfoText
        isError={isError}
        errorColor={theme.colors.error}
        testID={isError ? 'error-text' : 'info-text'}
      >
        {text}
      </InfoText>
      {isButtonVisible && onButtonClick && (
        <Button onPress={onButtonClick} style={{ backgroundColor: theme.colors.secondary }}>
          <ButtonLabel>{t('tryAgain')}</ButtonLabel>
        </Button>
      )}
    </Container>
  );
};

export default Info;
