import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const ButtonContainer = styled(TouchableOpacity)`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
