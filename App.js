import React from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator.js';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

if (__DEV__) {
  import('./reactotronconfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PaperProvider>
            <RootNavigator />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
