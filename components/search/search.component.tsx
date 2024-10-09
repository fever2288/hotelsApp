import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, SearchTextInput } from './search.styles';

interface SearchBarProps {
  query: string;
  onQueryChange: (newQuery: string) => void;
}

/**
 * SearchBar component that renders a text input for user to search.
 * It takes a query and a callback to handle the change of the query.
 *
 * @param {SearchBarProps} props - The properties for the SearchBar component.
 * @param {string} props.query - The current query string to display in the input.
 * @param {function} props.onQueryChange - Callback function to handle query input changes.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <SearchTextInput
        placeholder={t('searchPlaceholder')}
        value={query}
        onChangeText={onQueryChange}
      />
    </Container>
  );
};

export default SearchBar;
