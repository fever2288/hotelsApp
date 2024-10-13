import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import {
  HotelContainer,
  BackgroundImage,
  HotelInfo,
  HotelName,
  HotelLocation,
  PriceText,
  PriceCircle,
  StarContainer,
} from './hotel.styles';
import noImage from '../../assets/images/no-image.jpg';
import { Hotel as HotelType } from '../../types/hotel.type';
import Star from '../star/star.component';

interface HotelProps {
  hotel: HotelType;
  onPress: (hotelId: number) => void;
  disabled?: boolean;
}

/**
 * Hotel component renders a hotel item with stars, price, and basic info.
 * If no image is available, it shows a default no-image background.
 *
 * @param {HotelProps} props - The props for the Hotel component.
 * @param {HotelType} props.hotel - The hotel data to display.
 * @param {function} props.onPress - Function to call when hotel is pressed.
 * @param {boolean} [props.disabled=false] - Whether the component is disabled.
 * @returns {JSX.Element} The rendered Hotel component.
 */
const HotelComponent: React.FC<HotelProps> = ({ hotel, onPress, disabled = false }) => {
  const backgroundImage =
    hotel.gallery && hotel.gallery.length > 0 ? { uri: hotel.gallery[0] } : noImage;

  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress(hotel.id)}
      disabled={disabled}
      testID="hotel-touchable"
    >
      <HotelContainer>
        <BackgroundImage source={backgroundImage} testID="hotel-background">
          <StarContainer>
            <Star numberOfStars={hotel.stars} isSelected={false} />
          </StarContainer>

          <PriceCircle>
            <PriceText>
              <Text>{`${hotel.price} ${hotel.currency}`}</Text>
            </PriceText>
          </PriceCircle>

          <HotelInfo>
            <HotelName>{hotel.name}</HotelName>
            <HotelLocation>{hotel.location.city}</HotelLocation>
          </HotelInfo>
        </BackgroundImage>
      </HotelContainer>
    </TouchableOpacity>
  );
};

export default HotelComponent;
