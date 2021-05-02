import { all, fork } from 'redux-saga/effects';
import createAddressSaga from '../feature/createAddress/redux/saga';
import manageAddressSaga from '../feature/manageAddress/redux/saga';

export default function* RootSaga() {
  yield all([fork(createAddressSaga)]);
  yield all([fork(manageAddressSaga)]);
}
