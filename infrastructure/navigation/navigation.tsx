import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../../screens/home-screen/home-screen.screen';
import HotelScreen from '../../screens/hotel-screen/hotel-screen.screen';

export type RootStackParamList = {
  Home: undefined;
  HotelScreen: { hotelId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="HotelScreen"
          component={HotelScreen}
          options={{
            gestureEnabled: false,
            title: t('goBack'),
            gestureDirection: 'vertical',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
