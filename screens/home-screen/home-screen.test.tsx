import { useNavigation } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import HomeScreen from './home-screen.screen';
import { mockTheme } from '../../__mocks__/test-mock-data';
import { mockApiHotels } from '../../__mocks__/test-mock-data';
import useFetchData from '../../hooks/useFetchData';
import { useHotelContext } from '../../store/hotels.context';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../hooks/useFetchData');
jest.mock('../../store/hotels.context');

describe('HomeScreen Component', () => {
  const renderWithTheme = (component: JSX.Element) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn(),
    });

    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isRefetching: false,
    });

    (useHotelContext as jest.Mock).mockReturnValue({
      hotels: [...mockApiHotels],
      addHotels: jest.fn(),
    });
  });

  test('renders HomeScreen with hotels and search bar', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme(<HomeScreen />);

    const searchBar = getByPlaceholderText('searchPlaceholder');
    expect(searchBar).toBeTruthy();

    expect(getByText('Hilton')).toBeTruthy();
  });

  test('shows loading spinner when data is loading', () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
      isRefetching: false,
    });

    const { getByTestId } = renderWithTheme(<HomeScreen />);

    expect(getByTestId('loading-container')).toBeTruthy();
  });

  test('shows error message when data fetching fails', () => {
    (useFetchData as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
      isRefetching: false,
    });

    const { getByTestId } = renderWithTheme(<HomeScreen />);

    expect(getByTestId('error-message')).toBeTruthy();
  });
});
