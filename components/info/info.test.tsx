import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import Info from './info.component';
import { mockTheme } from '../../utils/test-mock-data';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Info Component', () => {
  const renderWithTheme = (component: JSX.Element) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('renders button when isButtonVisible is true', () => {
    const mockOnButtonClick = jest.fn();

    const { getByText } = renderWithTheme(
      <Info
        image={{ uri: 'test-image' }}
        text="Test with Button"
        isButtonVisible={true}
        onButtonClick={mockOnButtonClick}
      />
    );

    const button = getByText('tryAgain');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockOnButtonClick).toHaveBeenCalled();
  });

  test('renders image and text correctly', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Info image={{ uri: 'test-image' }} text="Test without Button" isButtonVisible={false} />
    );

    const image = getByTestId('info-image');
    expect(image).toBeTruthy();

    const text = getByText('Test without Button');
    expect(text).toBeTruthy();
  });
});
