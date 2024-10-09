import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';

import { LoadingContainer, LoadingText } from './loader.styles';
interface LoadingProps {
  size?: 'small' | 'large' | number;
  color?: string;
}

/**
 * Loading component that displays a loading spinner and a localized loading message.
 * @param {LoadingProps} props - The props for the component, including size and color for the ActivityIndicator.
 * @returns {JSX.Element} The loading indicator and message component.
 */
const Loader: React.FC<LoadingProps> = ({ size = 'large', color }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <LoadingContainer testID="loading-container">
      <ActivityIndicator testID="loading-spinner" size={size} color={color} />
      <LoadingText testID="loading-text">{t('loading')}</LoadingText>
    </LoadingContainer>
  );
};

export default Loader;
