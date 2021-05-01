import React from 'react';
import { Appbar, IconButton, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeAddress } from './redux/reducer';

const ManageAddressScreen = () => {
  const disptach = useDispatch();
  const { goBack } = useNavigation();
  const addressesList = useSelector(
    (state) => state.manageAddressReducerPersist.state.addressesList
  );

  const renderItem = ({ item }) => {
    return (
      <List.Item
        title={item?.city}
        description={`${item?.temp}°`}
        left={(props) => <List.Icon {...props} icon="city" />}
        right={() => (
          <IconButton
            color="#6200ee"
            icon="delete"
            onPress={() => disptach(removeAddress(item?.ibge))}></IconButton>
        )}
      />
    );
  };

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="Histórico de cidades"></Appbar.Content>
      </Appbar>
      <FlatList
        keyExtractor={(item) => item.city_name.toString()}
        renderItem={(item) => renderItem(item)}
        data={addressesList}
      />
    </>
  );
};

export default ManageAddressScreen;
