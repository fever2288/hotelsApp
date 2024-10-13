import { ImageBackground, View, Text } from 'react-native';
import styled from 'styled-components/native';

export const HotelContainer = styled(View)`
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  elevation: 5;
  margin-vertical: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const BackgroundImage = styled(ImageBackground)`
  border-radius: 10px;
  overflow: hidden;
  min-height: 240px;
  justify-content: flex-end;
`;

export const HotelInfo = styled(View)`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const HotelName = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-weight: bold;
  text-align: center;
  background-color: ${({ theme }) => `${theme.colors.secondary}cc`};
  padding: 8px 12px;
  border-radius: 10px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const HotelLocation = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.body};
  text-align: center;
  background-color: ${({ theme }) => `${theme.colors.secondary}cc`}; /* 80% opacity */
  padding: 5px 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StarContainer = styled(View)`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const PriceCircle = styled(View)`
  position: absolute;
  top: 8px;
  right: 8px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const PriceText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
