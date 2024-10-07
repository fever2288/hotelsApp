import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../../screens/home-screen/home-screen.screen';
import HotelScreen from '../../screens/hotel-screen/hotel-screen.screen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HotelScreen" component={HotelScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
