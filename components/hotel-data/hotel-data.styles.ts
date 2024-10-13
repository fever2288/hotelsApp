import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export const RowContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const IconContainer = styled(View)`
  margin-right: 8px;
  justify-content: center;
  align-items: flex-start;
`;

export const SectionTitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.secondary};
  width: 30%;
`;

export const DetailText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  width: 65%;
  text-align: right;
`;
