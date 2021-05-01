import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  consultaCep,
  primeiraConsultaCep,
} from '../createAddress/redux/reducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useNavigation();
  const [ultimaConsulta, setUltimaConsulta] = useState();
  const addressesList = useSelector(
    (state) => state.manageAddressReducerPersist.state.addressesList
  );
  useEffect(() => {
    setUltimaConsulta(_.last(addressesList));
  }, [addressesList]);

  useEffect(() => {
    addressesList.length == 0 ? dispatch(consultaCep('01153000')) : null;
  }, []);

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
        <Appbar.Content
          style={{ alignItems: 'center' }}
          title={ultimaConsulta?.city}
        />
        <Appbar.Action
          icon="plus"
          onPress={() => navigate('CreateAddressScreen')}
        />
      </Appbar>
      <FlatList
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 96 }}>
            <Text style={{ fontSize: 64 }}>{`${ultimaConsulta?.temp}°`}</Text>
            <Text style={{ fontSize: 16 }}>{ultimaConsulta?.description}</Text>
            <Text style={{ fontSize: 16 }}>{ultimaConsulta?.time}</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={() => console.log('Refreshing')}></FlatList>
    </>
  );
};

export default HomeScreen;
