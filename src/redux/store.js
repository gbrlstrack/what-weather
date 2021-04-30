import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './RootReducer';
import RootSaga from './RootSaga';
import { persistReducer, persistStore } from 'redux-persist/es';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import reactotronconfig from '../../reactotronconfig';

const sagaMonitor = reactotronconfig.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
  enhancers: [reactotronconfig.createEnhancer()],
});

const persistor = persistStore(store);

export { store, persistor };
sagaMiddleware.run(RootSaga);
