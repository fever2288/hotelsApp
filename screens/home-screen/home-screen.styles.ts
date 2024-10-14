import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  padding-top: 18px;
  background-color: white;
  padding: 16px;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const SearchContainer = styled(View)`
  flex: 1;
`;

export const FilterButton = styled(TouchableOpacity)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  justify-content: center;
  margin-left: 10px;
  padding: 10px;
`;

export const EmptyComponent = styled(View)`
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: center;
`;

export const LoaderContainer = styled(View)`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
