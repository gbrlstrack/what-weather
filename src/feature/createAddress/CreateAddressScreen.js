import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Appbar, Button, Snackbar, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  consultaCep,
  clearcreateAddressSuccess,
  createAdressSuccess,
} from './redux/reducer';

const CreateAddressScreen = () => {
  const { goBack } = useNavigation();
  const [cep, setCep] = useState('');
  const [errorType, setErrorType] = useState('');
  const dispatch = useDispatch();

  const { error, loading, createAdressSuccess } = useSelector(
    (state) => state.createAddressReducerPersist.state
  );

  useEffect(() => {
    setErrorType(error);
  }, [error]);

  useEffect(() => {
    if (createAdressSuccess === true) {
      dispatch(clearcreateAddressSuccess());
      goBack();
    }
  }, [createAdressSuccess]);

  return (
    <>
      <Appbar.Header style={{ justifyContent: 'space-between' }}>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content
          style={{ alignSelf: 'center' }}
          title="Adicionar cidade"
        />
      </Appbar.Header>
      <View
        style={{
          paddingBottom: 16,
          paddingTop: 16,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View>
          <Text style={{ fontSize: 24, lineHeight: 40, marginBottom: 8 }}>
            Para adicionar uma cidade na lista preecha o campo abaixo:
          </Text>
          <TextInput
            onChangeText={(text) => {
              setCep(text);
            }}
            value={cep}
            keyboardType="numeric"
            maxLength={8}
            mode="outlined"
            label="Insira um CEP"
          />
          <View style={{ height: 16 }} />
        </View>
        <Button
          disabled={loading || cep?.length < 8 || cep === ''}
          loading={loading}
          mode="contained"
          children="Adicionar"
          onPress={() => {
            dispatch(consultaCep(cep));
          }}
        />
      </View>
      <Snackbar
        style={{ backgroundColor: '#6200ee' }}
        visible={errorType == 'CEP_INVALIDO' ? true : false}
        duration={3000}
        onDismiss={() => dispatch(clearError())}>
        {'CEP invádio! Insira o CEP novamente.'}
      </Snackbar>
    </>
  );
};

export default CreateAddressScreen;
