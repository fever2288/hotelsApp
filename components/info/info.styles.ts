import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  margin: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InfoImage = styled(Image)`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

export const InfoText = styled(Text)<{ isError: boolean; errorColor: string }>`
  font-size: ${({ theme }) => theme.fontSizes.title};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-align: center;
  margin-bottom: 10px;
  padding: 12px;
`;
