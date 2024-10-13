import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  width: 100%;
`;

export const SearchTextInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ClearButtonContainer = styled(View)`
  width: 40px;
  justify-content: center;
  align-items: center;
`;
