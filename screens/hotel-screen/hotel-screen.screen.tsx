import { useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SliderBox } from 'react-native-image-slider-box';
import { useTheme } from 'styled-components/native';

import {
  ContactSection,
  Title,
  GalleryContainer,
  HotelScreenContainer,
} from './hotel-screen.styles';
import errorImage from '../../assets/images/error.png';
import HotelComponent from '../../components/hotel/hotel.component';
import HotelData from '../../components/hotel-data/hotel-data.component';
import Info from '../../components/info/info.component';
import { useHotelContext } from '../../store/hotels.context';
import { Hotel as HotelType } from '../../types/hotel.type';

/**
 * HotelScreen component is responsible for displaying the details of a specific hotel.
 *
 * This component fetches the hotel data from the context based on the `hotelId` received
 * from the navigation route. It renders various hotel details such as address, phone number,
 * email, user rating, and check-in/check-out times using the reusable HotelData component.
 *
 * If the hotel is not found, an error screen is displayed with the Info component.
 *
 * @returns JSX.Element displaying the hotel details or an error screen.
 */

interface RouteParams {
  hotelId: number;
}

const HotelScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { hotels } = useHotelContext();
  const theme = useTheme();
  const { t } = useTranslation();
  const hotelId = route.params?.hotelId;
  const hotel: HotelType | undefined = hotels.find((h) => h.id === hotelId);

  if (!hotel) {
    return (
      <Info
        image={errorImage}
        text={t('errorFetchingData')}
        isButtonVisible={false}
        onButtonClick={() => {}}
        isError={true}
      />
    );
  }

  return (
    <HotelScreenContainer>
      <HotelComponent hotel={hotel} onPress={() => {}} disabled />

      <Title>{t('hotelDetails')}</Title>
      <ContactSection>
        <HotelData icon="map-marker" title={t('address')} value={hotel.location.address} />
        <HotelData
          icon="building-o"
          title={t('city')}
          value={hotel.location.city}
          testID="hotel-city"
        />
        <HotelData icon="phone" title={t('phone')} value={hotel.contact.phoneNumber} />
        <HotelData icon="envelope-o" title={t('email')} value={hotel.contact.email} />
        <HotelData icon="star" title={t('userRating')} value={hotel.userRating} />
        <HotelData
          icon="clock-o"
          title={t('checkIn')}
          value={`${hotel.checkIn.from} - ${hotel.checkIn.to}`}
        />
        <HotelData
          icon="clock-o"
          title={t('checkOut')}
          value={`${hotel.checkOut.from} - ${hotel.checkOut.to}`}
        />
      </ContactSection>

      {hotel.gallery.length > 0 && (
        <GalleryContainer testID="slider-box">
          <Title>{t('gallery', { count: hotel.gallery.length })}</Title>
          <SliderBox images={hotel.gallery} dotColor={theme.colors.secondary} />
        </GalleryContainer>
      )}
    </HotelScreenContainer>
  );
};

export default HotelScreen;
