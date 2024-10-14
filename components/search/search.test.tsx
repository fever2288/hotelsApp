import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import SearchBar from './search.component';
import { mockTheme } from '../../__mocks__/test-mock-data';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'searchPlaceholder') {
        return 'Search hotels...';
      }
      return key;
    },
  }),
}));

describe('SearchBar Component', () => {
  const renderWithTheme = (component: JSX.Element) => {
    return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
  };

  test('renders with default placeholder text', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <SearchBar query="" onQueryChange={() => {}} />
    );
    const input = getByPlaceholderText('Search hotels...');
    expect(input).toBeTruthy();
  });

  test('renders correctly with provided query', () => {
    const query = 'Hello';
    const { getByDisplayValue } = renderWithTheme(
      <SearchBar query={query} onQueryChange={() => {}} />
    );
    const input = getByDisplayValue(query);
    expect(input.props.value).toBe(query);
  });

  test('triggers onQueryChange when text input changes', () => {
    const mockOnQueryChange = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <SearchBar query="" onQueryChange={mockOnQueryChange} />
    );
    const input = getByPlaceholderText('Search hotels...');

    fireEvent.changeText(input, 'New Query');
    expect(mockOnQueryChange).toHaveBeenCalledWith('New Query');
  });

  test('renders "X" button when query is not empty', () => {
    const { getByTestId } = renderWithTheme(<SearchBar query="Hello" onQueryChange={() => {}} />);
    const clearButton = getByTestId('clear-button');
    expect(clearButton).toBeTruthy();
  });

  test('does not render "X" button when query is empty', () => {
    const { queryByTestId } = renderWithTheme(<SearchBar query="" onQueryChange={() => {}} />);
    const clearButton = queryByTestId('clear-button');
    expect(clearButton).toBeNull();
  });

  test('clears the query when "X" button is pressed', () => {
    const mockOnQueryChange = jest.fn();
    const { getByTestId } = renderWithTheme(
      <SearchBar query="Hello" onQueryChange={mockOnQueryChange} />
    );

    const clearButton = getByTestId('clear-button');
    fireEvent.press(clearButton);

    expect(mockOnQueryChange).toHaveBeenCalledWith('');
  });
});
