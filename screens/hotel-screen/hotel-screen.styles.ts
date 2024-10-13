import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';

export const HotelScreenContainer = styled(ScrollView)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
`;

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 5px;
  border-radius: 6px;
`;

export const ContactSection = styled(View)`
  padding-horizontal: 16px;
`;

export const RowContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const IconContainer = styled(View)`
  width: 10%;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.secondary};
  width: 30%;
`;

export const DetailText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  width: 55%;
  text-align: right;
`;

export const GalleryContainer = styled(View)`
  margin-bottom: 40px;
`;
