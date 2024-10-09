import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import Loader from './loader.component';
import { mockTheme } from '../../utils/test-mock-data';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'loading') {
        return 'Loading...';
      }
      return key;
    },
  }),
}));

describe('Loader Component', () => {
  const renderWithTheme = (component: JSX.Element) => {
    return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
  };

  test('renders with default props', () => {
    const { getByTestId } = renderWithTheme(<Loader />);
    const activityIndicator = getByTestId('loading-spinner');
    expect(activityIndicator.props.size).toBe('large');
    expect(activityIndicator.props.color).toBeUndefined();
  });

  test('renders correctly with provided size and color', () => {
    const providedSize = 'small';
    const providedColor = '#ffffff';
    const { getByTestId } = renderWithTheme(<Loader size={providedSize} color={providedColor} />);
    const activityIndicator = getByTestId('loading-spinner');
    expect(activityIndicator.props.size).toBe(providedSize);
    expect(activityIndicator.props.color).toBe(providedColor);
  });

  test('renders localized loading text', () => {
    const { getByTestId } = renderWithTheme(<Loader />);
    const loadingText = getByTestId('loading-text');
    expect(loadingText.children[0]).toBe('Loading...');
  });
});
