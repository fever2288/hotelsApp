import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useTranslation } from 'react-i18next';

import StarFilter from './star-filter.component';
import { mockTheme } from '../../utils/test-mock-data';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('StarFilter Component', () => {
  const renderWithTheme = (component: JSX.Element) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('renders 5 star buttons', () => {
    const { getByTestId } = renderWithTheme(<StarFilter onFilterChange={() => {}} />);
    const button1 = getByTestId('star-button-1');
    const button5 = getByTestId('star-button-5');

    expect(button1).toBeTruthy();
    expect(button5).toBeTruthy();
  });

  test('calls onFilterChange with the correct star rating when clicked', () => {
    const onFilterChangeMock = jest.fn();
    const { getByTestId } = renderWithTheme(<StarFilter onFilterChange={onFilterChangeMock} />);

    const starButton1 = getByTestId('star-button-1');
    fireEvent.press(starButton1);
    expect(onFilterChangeMock).toHaveBeenCalledWith([1]);
  });

  test('toggles star selection correctly', () => {
    const onFilterChangeMock = jest.fn();
    const { getByTestId } = renderWithTheme(<StarFilter onFilterChange={onFilterChangeMock} />);

    const starButton2 = getByTestId('star-button-2');
    const starButton3 = getByTestId('star-button-3');

    fireEvent.press(starButton2);
    fireEvent.press(starButton3);
    expect(onFilterChangeMock).toHaveBeenCalledWith([2, 3]);

    fireEvent.press(starButton2);
    expect(onFilterChangeMock).toHaveBeenCalledWith([3]);
  });

  test('renders the title with translation', () => {
    const { getByText } = renderWithTheme(<StarFilter onFilterChange={() => {}} />);

    const title = getByText('filterByStars');
    expect(title).toBeTruthy();
  });
});
