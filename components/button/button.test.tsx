import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import Button from './button.component';
import { mockTheme } from '../../utils/test-mock-data';

describe('Button Component', () => {
  const renderWithTheme = (component: JSX.Element) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('renders the button content correctly', () => {
    const { getByText } = renderWithTheme(
      <Button onPress={() => {}} testID="button">
        <Text>Click Me</Text>
      </Button>
    );
    const button = getByText('Click Me');
    expect(button).toBeTruthy();
  });

  test('calls onPress when the button is clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(
      <Button onPress={onPressMock} testID="button">
        <Text>Click Me</Text>
      </Button>
    );

    const button = getByText('Click Me');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
