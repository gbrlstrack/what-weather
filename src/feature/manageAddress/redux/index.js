import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist/es';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import ManageAddressReducer from './reducer';

const persistConfig = {
  key: 'manageAddressScreen',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['addressesList'],
};

const manageAddressReducerPersist = combineReducers({
  state: persistReducer(persistConfig, ManageAddressReducer),
});

export default manageAddressReducerPersist;
