import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Appbar } from 'react-native-paper';

const HomeScreen = () => {
  const { navigate } = useNavigation();
  return (
    <Appbar
      style={{
        elevation: 0,
        justifyContent: 'space-between',
        // backgroundColor: 'transparent',
      }}>
      <Appbar.Action
        icon="menu"
        onPress={() => console.log('Lista de cidades')}
      />
      <Appbar.Content
        style={{ alignItems: 'center' }}
        title="Ponta Grossa, 18"
      />
      <Appbar.Action
        icon="plus"
        onPress={() => navigate('CreateAddressScreen')}
      />
    </Appbar>
  );
};

export default HomeScreen;
