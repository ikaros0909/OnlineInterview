import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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