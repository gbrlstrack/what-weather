import React from 'react';
import {
  ActivityIndicator,
  Appbar,
  IconButton,
  List,
  Snackbar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAddressesList, removeAddress } from './redux/reducer';
import { clearError } from '../createAddress/redux/reducer';

const ManageAddressScreen = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { addressesList, isRefreshing } = useSelector(
    (state) => state.manageAddressReducerPersist.state
  );

  const { error } = useSelector(
    (state) => state.createAddressReducerPersist.state
  );
  console.log(error);
  const renderItem = ({ item }) => {
    return (
      <List.Item
        title={item?.city}
        description={`${item?.temp}°   -   ${item?.time}`}
        left={(props) => <List.Icon {...props} icon="city" />}
        right={() => (
          <IconButton
            color="#6200ee"
            icon="delete"
            onPress={() => dispatch(removeAddress(item?.ibge))}></IconButton>
        )}
      />
    );
  };
  console.log('addressesList', addressesList);
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="Histórico de cidades"></Appbar.Content>
      </Appbar>
      <FlatList
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              marginTop: 64,
            }}>
            <Text style={{ fontSize: 24 }}>Tentando recuperar dados</Text>
            <View style={{ height: 16 }} />
            <ActivityIndicator size="large" />
          </View>
        )}
        refreshing={isRefreshing}
        onRefresh={() => dispatch(refreshAddressesList())}
        keyExtractor={(item) => item?.city_name?.toString()}
        renderItem={(item) => renderItem(item)}
        data={addressesList[0].length >= 1 ? addressesList : []}
      />
      <Snackbar
        duration={3000}
        onDismiss={() => dispatch(clearError())}
        visible={error !== '' ? true : false}>
        {error == 'SEM_INTERNET'
          ? 'Erro de conexão'
          : error == 'DEFAULT'
          ? 'Algo não saiu bem, tente novamente em alguns minutos'
          : 'Erro'}
      </Snackbar>
    </>
  );
};

export default ManageAddressScreen;
