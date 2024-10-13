import { useRoute } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import HotelScreen from './hotel-screen.screen';
import { useHotelContext } from '../../store/hotels.context';
import { mockTheme } from '../../utils/test-mock-data';

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
  const mockHotel = {
    id: 1,
    name: 'Hilton',
    location: {
      address: 'Gran Via',
      city: 'Madrid',
      latitude: 40.4155,
      longitude: -3.7074,
    },
    stars: 5,
    checkIn: { from: '12:00', to: '20:00' },
    checkOut: { from: '07:00', to: '10:00' },
    contact: { phoneNumber: '+34123654', email: 'hilton@gmail.com' },
    gallery: ['https://example.com/images/hilton1.jpg', 'https://example.com/images/hilton2.jpg'],
    userRating: 9.8,
    price: 100,
    currency: 'EUR',
  };

  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { hotelId: 1 },
    });
  });

  test('should render hotel details when hotel is found', () => {
    (useHotelContext as jest.Mock).mockReturnValue({
      hotels: [mockHotel],
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
      hotels: [mockHotel],
    });

    const { getByTestId } = renderWithProviders(<HotelScreen />);

    expect(getByTestId('slider-box')).toBeTruthy();
  });

  test('should not render the gallery when there are no images', () => {
    const hotelWithoutGallery = { ...mockHotel, gallery: [] };

    (useHotelContext as jest.Mock).mockReturnValue({
      hotels: [hotelWithoutGallery],
    });

    const { queryByTestId } = renderWithProviders(<HotelScreen />);

    expect(queryByTestId('slider-box')).toBeFalsy();
  });
});
