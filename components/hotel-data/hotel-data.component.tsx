import React from 'react';
import { useTranslation } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'styled-components/native';

import { RowContainer, IconContainer, SectionTitle, DetailText } from './hotel-data.styles';
/**
 * HotelData component is used to display a hotel-related detail with an associated icon, title, and value.
 * It uses FontAwesome for displaying icons and styled-components for styling.
 *
 * If the value is null or undefined, it will return N/A
 *
 * Props:
 * - @param {string} icon - The FontAwesome icon name to be displayed (e.g., 'map-marker', 'phone').
 * - @param {string} title - The title or label for the data being displayed.
 * - @param {string | number | null} value - The actual value to display. Falls back to translation if null/undefined.
 *
 */

interface HotelDataProps {
  icon: string;
  title: string;
  value: string | number | null;
  testID?: string;
}

const HotelData: React.FC<HotelDataProps> = ({ icon, title, value, testID }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <RowContainer testID={testID}>
      <IconContainer testID="icon-container">
        <FontAwesome name={icon} size={24} color={theme.colors.secondary} />
      </IconContainer>
      <SectionTitle>{title}</SectionTitle>
      <DetailText>{value ?? t('notExist')}</DetailText>
    </RowContainer>
  );
};

export default HotelData;
