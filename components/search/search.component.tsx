import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'styled-components/native';

import { Container, SearchTextInput, ClearButtonContainer } from './search.styles';

interface SearchBarProps {
  query: string;
  onQueryChange: (newQuery: string) => void;
}

/**
 * SearchBar component that renders a text input for user to search.
 * It takes a query and a callback to handle the change of the query.
 * Includes an "X" button to clear the search input.
 *
 * @param {SearchBarProps} props - The properties for the SearchBar component.
 * @param {string} props.query - The current query string to display in the input.
 * @param {function} props.onQueryChange - Callback function to handle query input changes.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const clearSearch = () => {
    onQueryChange('');
  };

  return (
    <Container>
      <SearchTextInput
        placeholder={t('searchPlaceholder')}
        value={query}
        onChangeText={onQueryChange}
      />

      {query.length > 0 && (
        <ClearButtonContainer>
          <TouchableOpacity onPress={clearSearch} testID="clear-button">
            <FontAwesome name="times" size={20} color={theme.colors.secondary} />
          </TouchableOpacity>
        </ClearButtonContainer>
      )}
    </Container>
  );
};

export default SearchBar;
