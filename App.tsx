import { useFonts as useBalsamiq, BalsamiqSans_400Regular } from '@expo-google-fonts/balsamiq-sans';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components/native';

import i18n from './i18n';
import Navigation from './infrastructure/navigation/navigation';
import { theme } from './infrastructure/theme';

const App = () => {
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
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Navigation />
      </I18nextProvider>
    </ThemeProvider>
  );
};
export default App;
