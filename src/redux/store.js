import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './RootReducer';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: { RootReducer },
  middleware: [sagaMiddleware],
});
//sagaMiddleware.run(RootSaga);
export default store;
