import React from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator.js';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
