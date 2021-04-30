import React from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator.js';
import { Provider } from 'react-redux';
import store from './src/redux/store.js';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
