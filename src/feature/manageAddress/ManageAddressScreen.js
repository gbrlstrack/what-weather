import React from 'react';
import { Appbar, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
const ManageAddressScreen = () => {
  const { goBack } = useNavigation();
  const addressesList = useSelector(
    (state) => state.manageAddressReducerPersist.state.addressesList
  );

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <List.Item
        title={item?.city}
        description={`${item?.temp}°`}
        left={(props) => <List.Icon {...props} icon="city" />}
      />
    );
  };

  //   console.log({ addressesList });
  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => goBack()} />
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
