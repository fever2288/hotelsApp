import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Header,
  SearchContainer,
  FilterButton,
  EmptyComponent,
  LoaderContainer,
} from './home-screen.styles';
import { ENDPOINT_HOTELS } from '../../api';
import emptyImage from '../../assets/images/empty.png';
import errorImage from '../../assets/images/error.png';
import HotelComponent from '../../components/hotel/hotel.component';
import Info from '../../components/info/info.component';
import Loader from '../../components/loading/loader.component';
import SearchBar from '../../components/search/search.component';
import StarFilter from '../../components/star-filter/star-filter.component';
import useFetchData from '../../hooks/useFetchData';
import { RootStackParamList } from '../../infrastructure/navigation/navigation';
import { useHotelContext } from '../../store/hotels.context';
import { Hotel as HotelType } from '../../types/hotel.type';
import { getValidImages } from '../../utils/helper-functions';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

/**
 * HomeScreen Component
 *
 * This component displays a list of hotels, includes a search bar, and allows filtering by star rating.
 * It fetches hotel data from the specified API endpoint and handles loading, error, and empty states.
 *
 * @returns {JSX.Element} - The rendered home screen component with a list of hotels and search functionality.
 */
const HomeScreen = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [isImagesChecked, setIsImagesChecked] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { hotels, addHotels } = useHotelContext();
  const { data, isLoading, isError, refetch, isRefetching } =
    useFetchData<HotelType[]>(ENDPOINT_HOTELS);

  const isWaitingForData = isLoading || isRefetching || !isImagesChecked;

  // Check if images are valid because some of them are not and we want to exclude them
  useEffect(() => {
    const checkHotelImages = async () => {
      if (data && data.length > 0 && data.length !== hotels.length) {
        const hotelsWithValidImages = await Promise.all(
          data.map(async (hotel) => {
            const validGallery = await getValidImages(hotel.gallery);
            return { ...hotel, gallery: validGallery };
          })
        );
        addHotels(hotelsWithValidImages);
      }
      setIsImagesChecked(true);
    };

    if (data) {
      setIsImagesChecked(false);
      checkHotelImages();
    }
  }, [data, hotels.length, addHotels]);

  const handlePress = (hotelId: number) => {
    navigation.navigate('HotelScreen', { hotelId });
  };

  const handleRefresh = () => {
    refetch();
    setQuery('');
  };

  const toggleFilters = () => {
    if (showFilters) {
      setSelectedStars([]);
    }
    setShowFilters(!showFilters);
  };

  // Filter the list of hotels based on the search query and selected star ratings
  const filteredHotels = hotels.filter((hotel: HotelType) => {
    const matchesQuery = hotel.name.toLowerCase().includes(query.toLowerCase());
    const matchesStarFilter = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
    return matchesQuery && matchesStarFilter;
  });

  if (isError) {
    return (
      <Container>
        <Info
          image={errorImage}
          text={t('errorFetchingData')}
          isButtonVisible={true}
          onButtonClick={refetch}
          isError={true}
          testID="error-message"
        />
      </Container>
    );
  }

  if (isWaitingForData) {
    return (
      <LoaderContainer testID="loading-spinner">
        <Loader size="large" color={theme.colors.secondary} />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <Header>
        <SearchContainer>
          <SearchBar query={query} onQueryChange={setQuery} />
        </SearchContainer>

        <FilterButton onPress={toggleFilters} testID="filter-button">
          <FontAwesome name="filter" size={24} color={theme.colors.primary} />
        </FilterButton>
      </Header>

      {showFilters && <StarFilter onFilterChange={setSelectedStars} />}

      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.duration(500).delay(index * 100)}>
            <HotelComponent hotel={item} onPress={handlePress} />
          </Animated.View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={[theme.colors.secondary]}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyComponent>
            <Info image={emptyImage} text={t('noHotels')} isButtonVisible={false} isError={false} />
          </EmptyComponent>
        }
        testID="hotel-list"
      />
    </Container>
  );
};

export default HomeScreen;
