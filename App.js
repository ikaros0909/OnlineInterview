import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Loader from './src/utils/components/Loader';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { configureStore } from './src/store';

const { store, persistor } = configureStore();

export default () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar hidden />
            <Navigation colorScheme={colorScheme} />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
};