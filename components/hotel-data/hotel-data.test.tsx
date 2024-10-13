import { render } from '@testing-library/react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider } from 'styled-components/native';

import HotelData from './hotel-data.component';
import { mockTheme } from '../../utils/test-mock-data';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithProviders = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{children}</ThemeProvider>);
};

describe('HotelData Component', () => {
  it('should render the correct icon, title, and value', () => {
    const { getByText, getByTestId } = renderWithProviders(
      <HotelData icon="map-marker" title="Address" value="123 Main Street" />
    );

    expect(getByText('Address')).toBeTruthy();
    expect(getByText('123 Main Street')).toBeTruthy();

    expect(getByTestId('icon-container')).toBeTruthy();
  });

  it('should display "notExist" translation when value is undefined or null', () => {
    const { getByText } = renderWithProviders(
      <HotelData icon="map-marker" title="Address" value={null} />
    );

    expect(getByText('notExist')).toBeTruthy();
  });

  it('should apply the correct theme colors to the icon', () => {
    const { getByTestId } = renderWithProviders(
      <HotelData icon="map-marker" title="Address" value="123 Main Street" />
    );

    const iconElement = getByTestId('icon-container').findByType(FontAwesome);

    expect(iconElement.props.color).toBe(mockTheme.colors.secondary);
  });
});
