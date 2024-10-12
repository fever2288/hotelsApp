import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import HotelComponent from './hotel.component';
import noImage from '../../assets/images/no-image.jpg';
import { mockTheme } from '../../utils/test-mock-data';
import { mockApiHotels } from '../../utils/test-mock-data';

describe('HotelComponent', () => {
  const renderWithTheme = (component: JSX.Element) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('renders the hotel name, location, and price correctly', () => {
    const hotel = mockApiHotels[0];
    const { getByText } = renderWithTheme(<HotelComponent hotel={hotel} onPress={jest.fn()} />);

    expect(getByText(hotel.name)).toBeTruthy();
    expect(getByText(hotel.location.city)).toBeTruthy();

    const priceAndCurrency = `${hotel.price} ${hotel.currency}`;
    expect(getByText(priceAndCurrency)).toBeTruthy();
  });

  test('displays stars based on the hotel stars', () => {
    const hotel = mockApiHotels[0];
    const { getByTestId } = renderWithTheme(<HotelComponent hotel={hotel} onPress={jest.fn()} />);

    const starRow = getByTestId('star-row');
    expect(starRow.children.length).toBe(hotel.stars);
  });

  test('shows the first image in the gallery if available', () => {
    const hotel = mockApiHotels[0];
    const { getByTestId } = renderWithTheme(<HotelComponent hotel={hotel} onPress={jest.fn()} />);

    const backgroundImage = getByTestId('hotel-background');
    expect(backgroundImage.props.source.uri).toBe(hotel.gallery[0]);
  });

  test('shows fallback no-image background when no images are available', () => {
    const hotel = mockApiHotels[1];
    const { getByTestId } = renderWithTheme(<HotelComponent hotel={hotel} onPress={jest.fn()} />);

    const backgroundImage = getByTestId('hotel-background');
    expect(backgroundImage.props.source).toEqual(noImage);
  });

  test('calls onPress with correct hotel ID when clicked', () => {
    const hotel = mockApiHotels[0];
    const onPressMock = jest.fn();
    const { getByTestId } = renderWithTheme(<HotelComponent hotel={hotel} onPress={onPressMock} />);

    const hotelTouchable = getByTestId('hotel-touchable');
    fireEvent.press(hotelTouchable);
    expect(onPressMock).toHaveBeenCalledWith(hotel.id);
  });
});
