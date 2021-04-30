import { takeLatest, call, put } from '@redux-saga/core/effects';
import { CONSULTA_CEP, CONSULTA_TEMPO } from '../../../apis/cidadesApi';
import { pushAddress } from '../../manageAddress/redux/reducer';
import {
  consultaCep,
  setAddress,
  setError,
  setLoading,
  createAdressSuccess,
  setWeather,
} from './reducer';

function* watcherCreateAddresses() {
  yield takeLatest(consultaCep.type, workerConsultaCep);
}

function* workerConsultaCep({ payload }) {
  try {
    yield put(setLoading(true));
    const result = yield call(CONSULTA_CEP, { cep: payload });
    if (result.erro === true) {
      yield put(setError('CEP_INVALIDO'));
    } else {
      yield put(setAddress(result.localidade, result.uf));
      yield put(setLoading(false));
      const resultTempo = yield call(CONSULTA_TEMPO, {
        cidade: result.localidade,
        uf: result.uf,
      });
      if (resultTempo) {
        console.log({ resultTempo });
        yield put(setWeather(resultTempo));
        yield put(pushAddress(resultTempo.results));
        yield put(createAdressSuccess());
      } else {
        console.log(resultTempo);
      }
    }
  } catch (error) {
    console.log(error);
    yield put(setLoading(false));
  }
}

export default watcherCreateAddresses;
