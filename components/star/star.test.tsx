import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import Star from './star.component';
import { mockTheme } from '../../__mocks__/test-mock-data';

describe('Star Component', () => {
  const renderWithTheme = (component: JSX.Element) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('renders the correct number of stars', () => {
    const { getByTestId } = renderWithTheme(<Star numberOfStars={3} />);
    const starRow = getByTestId('star-row');

    expect(starRow.props.children).toHaveLength(3);
  });

  test('applies the correct color for selected stars', () => {
    const { getByTestId } = renderWithTheme(<Star numberOfStars={5} isSelected={true} />);
    const starRow = getByTestId('star-row');

    starRow.props.children.forEach((child: JSX.Element) => {
      expect(child.props.color).toBe(mockTheme.colors.primary);
    });
  });

  test('applies the correct color for unselected stars', () => {
    const { getByTestId } = renderWithTheme(<Star numberOfStars={5} isSelected={false} />);
    const starRow = getByTestId('star-row');

    starRow.props.children.forEach((child: JSX.Element) => {
      expect(child.props.color).toBe(mockTheme.colors.secondary);
    });
  });
});
