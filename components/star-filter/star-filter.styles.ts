import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const FilterContainer = styled(View)`
  padding: 10px;
`;

export const FilterTitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin-bottom: 15px;
`;

export const StarContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StarRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const IndividualContainer = styled(View)`
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;
