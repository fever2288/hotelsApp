import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';

import { FilterContainer, FilterTitle, StarContainer } from './star-filter.styles';
import Button from '../button/button.component';
import Star from '../star/star.component';

interface StarFilterProps {
  onFilterChange: (stars: number[]) => void;
}

/**
 * StarFilter component allows users to select one or more star ratings for filtering.
 *
 * @param {StarFilterProps} props - The props for the StarFilter component.
 * @param {(stars: number[]) => void} props.onFilterChange - Callback to return the selected star ratings to the parent component.
 * @returns {JSX.Element} The rendered StarFilter component.
 */
const StarFilter: React.FC<StarFilterProps> = ({ onFilterChange }) => {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const theme = useTheme();
  const { t } = useTranslation();

  const toggleStar = (star: number) => {
    const updatedStars = selectedStars.includes(star)
      ? selectedStars.filter((s) => s !== star)
      : [...selectedStars, star];

    setSelectedStars(updatedStars);
    onFilterChange(updatedStars);
  };

  return (
    <FilterContainer>
      <FilterTitle>{t('filterByStars')}</FilterTitle>

      <StarContainer>
        {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
          <Button
            key={star}
            onPress={() => toggleStar(star)}
            testID={`star-button-${star}`}
            style={{
              backgroundColor: selectedStars.includes(star)
                ? theme.colors.secondary
                : theme.colors.primary,
            }}
          >
            <Star numberOfStars={star} isSelected={selectedStars.includes(star)} />
          </Button>
        ))}
      </StarContainer>
    </FilterContainer>
  );
};

export default StarFilter;
