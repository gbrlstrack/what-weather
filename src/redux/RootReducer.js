import { combineReducers } from 'redux';
import createAddressReducerPersist from '../feature/createAddress/redux';
import manageAddressReducerPersist from '../feature/manageAddress/redux';

const rootReducer = combineReducers({
  createAddressReducerPersist,
  manageAddressReducerPersist,
});

export default rootReducer;
