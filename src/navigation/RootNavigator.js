import React from 'react';
import CreateAddressScreen from '../feature/createAddress/CreateAddressScreen';
import HomeScreen from '../feature/home/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="RootNavigator">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="CreateAddressScreen"
        component={CreateAddressScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
