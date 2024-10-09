import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const SearchTextInput = styled.TextInput`
  font-size: ${({ theme }) => theme.fontSizes.body};
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.secondary};
  border-width: 1px;
`;
