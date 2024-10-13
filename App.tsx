import { useFonts as useBalsamiq, BalsamiqSans_400Regular } from '@expo-google-fonts/balsamiq-sans';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import i18n from './i18n';
import Navigation from './infrastructure/navigation/navigation';
import { theme } from './infrastructure/theme';
import { HotelProvider } from './store/hotels.context';

/**
 * Main App component that sets up the core providers for the application.
 * It ensures the app has the following functionality:
 * - Google Fonts: Balsamiq and Lato fonts are loaded before rendering the app.
 * - Query Client Provider: Provides `react-query`'s QueryClient for data fetching.
 * - Hotel Provider: Manages the state of hotels using context.
 * - Theme Provider: Supplies a global theme for styled components.
 * - I18next Provider: Provides localization features using `i18next`.
 * - Navigation: Sets up the app's navigation structure.
 *
 * @returns {JSX.Element | null} The rendered application, or `null` while fonts are loading.
 */
const App = () => {
  const queryClient = new QueryClient();

  const [balsamiqdLoaded] = useBalsamiq({
    BalsamiqSans_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!balsamiqdLoaded || !latoLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HotelProvider>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
              <Navigation />
            </SafeAreaProvider>
          </I18nextProvider>
        </ThemeProvider>
      </HotelProvider>
    </QueryClientProvider>
  );
};

export default App;
