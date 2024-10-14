import { useRoute } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import HotelScreen from './hotel-screen.screen';
import { mockTheme } from '../../__mocks__/test-mock-data';
import { mockApiHotels } from '../../__mocks__/test-mock-data';
import { useHotelContext } from '../../store/hotels.context';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../store/hotels.context', () => ({
  useHotelContext: jest.fn(),
}));

jest.mock('react-native-image-slider-box', () => {
  return {
    SliderBox: () => <div data-testid="slider-box" />,
  };
});

const renderWithProviders = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{children}</ThemeProvider>);
};

describe('HotelScreen Component', () => {
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { hotelId: 1 },
    });
  });

  test('should render hotel details when hotel is found', () => {
    (useHotelContext as jest.Mock).mockReturnValue({
      hotels: [...mockApiHotels],
    });

    const { getByText, getByTestId } = renderWithProviders(<HotelScreen />);

    expect(getByText('Hilton')).toBeTruthy();
    expect(getByText('Gran Via')).toBeTruthy();
    expect(getByTestId('hotel-city')).toBeTruthy();
    expect(getByText('+34123654')).toBeTruthy();
    expect(getByText('hilton@gmail.com')).toBeTruthy();
    expect(getByText('9.8')).toBeTruthy();
    expect(getByText('12:00 - 20:00')).toBeTruthy();
    expect(getByText('07:00 - 10:00')).toBeTruthy();
  });

  test('should display the error screen when hotel is not found', () => {
    (useHotelContext as jest.Mock).mockReturnValue({
      hotels: [],
    });

    const { getByText } = renderWithProviders(<HotelScreen />);

    expect(getByText('errorFetchingData')).toBeTruthy();
  });

  test('should render the image gallery when the gallery is available', () => {
    (useHotelContext as jest.Mock).mockReturnValue({
      hotels: [...mockApiHotels],
    });

    const { getByTestId } = renderWithProviders(<HotelScreen />);

    expect(getByTestId('slider-box')).toBeTruthy();
  });

  test('should not render the gallery when there are no images', () => {
    const hotelWithoutGallery = { ...mockApiHotels, gallery: [] };

    (useHotelContext as jest.Mock).mockReturnValue({
      hotels: [hotelWithoutGallery],
    });

    const { queryByTestId } = renderWithProviders(<HotelScreen />);

    expect(queryByTestId('slider-box')).toBeFalsy();
  });
});
