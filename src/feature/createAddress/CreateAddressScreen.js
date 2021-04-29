import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';

const CreateAddressScreen = () => {
  const { canGoBack, goBack } = useNavigation();
  const [cep, setCep] = useState();
  const [loading, setLoading] = useState(false);
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const apiKey = '5471c80a';
  const consultaCep = async (cep) => {
    await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((result) => {
      setCidade(result.data.localidade);
      setUf(result.data.uf);
      console.log(result.data);
    });
    consultaTempo(cidade, uf, apiKey);
  };

  const consultaTempo = async (cidade, uf, apiKey) => {
    await axios
      .get(
        `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${cidade},${uf}`
      )
      .then((result) => console.log(result.data));

    setLoading(false);
  };
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
            onChangeText={(text) => setCep(text)}
            value={cep}
            keyboardType="numeric"
            maxLength={8}
            mode="outlined"
            label="Insira um CEP"
          />
          <View style={{ height: 16 }} />
        </View>
        <Button
          loading={loading}
          mode="contained"
          children="Adicionar"
          onPress={() => {
            consultaCep(cep);
            setLoading(true);
          }}
        />
      </View>
    </>
  );
};

export default CreateAddressScreen;
