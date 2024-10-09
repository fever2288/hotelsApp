import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

export const ButtonContainer = styled(TouchableOpacity)`
  padding: 10px 10px;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 5px;
  width: 200px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;
