import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { Appbar, ActivityIndicator, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  consultaCep,
  primeiraConsultaCep,
} from '../createAddress/redux/reducer';
import {
  refreshAddress,
  refreshAddressesList,
  setIsRefreshing,
} from '../manageAddress/redux/reducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useNavigation();
  const [ultimaConsulta, setUltimaConsulta] = useState();
  const state = useSelector((state) => state.manageAddressReducerPersist.state);
  const { addressesList, isRefreshing } = useSelector(
    (state) => state.manageAddressReducerPersist.state
  );
  const { error } = useSelector(
    (state) => state.createAddressReducerPersist.state
  );
  const refreshingAddress = () => {
    dispatch(refreshAddress(addressesList[0]));
  };
  useEffect(() => {
    dispatch(refreshAddressesList());
  }, []);
  useEffect(() => {
    setRefreshing(isRefreshing);
  }, [isRefreshing]);

  useEffect(() => {
    setUltimaConsulta(_.first(addressesList));
  }, [addressesList]);

  useEffect(() => {
    addressesList.length == 0
      ? dispatch(consultaCep('01153000'))
      : refreshingAddress();
  }, [addressesList]);

  return (
    <>
      <Appbar
        style={{
          justifyContent: 'space-between',
        }}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigate('ManageAddressScreen')}
        />
        {addressesList.length == 0 ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Appbar.Content
            style={{ alignItems: 'center' }}
            title={ultimaConsulta?.city}
          />
        )}
        <Appbar.Action
          icon="plus"
          onPress={() => navigate('CreateAddressScreen')}
        />
      </Appbar>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshingAddress}
          />
        }
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {addressesList.length == 0 ? (
          <View
            style={{
              padding: 16,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : ultimaConsulta?.temp == undefined ? (
          <View
            style={{
              alignItems: 'center',
              marginBottom: 208,
            }}>
            <Text style={{ fontSize: 28 }}>Tentando recuperar dados</Text>
            <View style={{ height: 16 }} />
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              marginBottom: 208,
            }}>
            <Text style={{ fontSize: 64 }}>{`${ultimaConsulta?.temp}°`}</Text>
            <Text style={{ fontSize: 16 }}>{ultimaConsulta?.description}</Text>
            <Text style={{ fontSize: 16 }}>{ultimaConsulta?.time}</Text>
          </View>
        )}
      </ScrollView>
      <Snackbar
        duration={3000}
        onDismiss={() => dispatch(clearError())}
        visible={error !== '' ? true : false}>
        {error == 'SEM_INTERNET'
          ? 'Erro de conexão'
          : error == 'DEFAULT'
          ? 'Algo não saiu bem, tente novamente em alguns minutos'
          : ''}
      </Snackbar>
    </>
  );
};

export default HomeScreen;
