import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useNavigation();
  const [ultimaConsulta, setUltimaConsulta] = useState();
  const addressesList = useSelector(
    (state) => state.manageAddressReducerPersist.state.addressesList
  );
  console.log(addressesList);
  useEffect(() => {
    setUltimaConsulta(addressesList[addressesList.length - 1]);
  }, [addressesList]);
  const { city, temp, description, forecast } = ultimaConsulta;
  return (
    <>
      <Appbar
        style={{
          justifyContent: 'space-between',
          // backgroundColor: 'transparent',
        }}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigate('ManageAddressScreen')}
        />
        <Appbar.Content style={{ alignItems: 'center' }} title={city} />
        <Appbar.Action
          icon="plus"
          onPress={() => navigate('CreateAddressScreen')}
        />
      </Appbar>
      <FlatList
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 96 }}>
            <Text style={{ fontSize: 64 }}>{`${temp}°`}</Text>
            <Text style={{ fontSize: 16 }}>{description}</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={() => console.log('Refreshing')}></FlatList>
    </>
  );
};

export default HomeScreen;
