import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist/es';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import CreateAddressReducer from './reducer';

const persistConfig = {
  key: 'createAddressScreen',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [],
};

const createAddressReducerPersist = combineReducers({
  state: persistReducer(persistConfig, CreateAddressReducer),
});

export default createAddressReducerPersist;
