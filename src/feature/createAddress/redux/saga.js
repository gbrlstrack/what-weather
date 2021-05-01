import { takeLatest, call, put } from '@redux-saga/core/effects';
import {
  CONSULTA_CEP,
  CONSULTA_CEP_BY_NOME,
  CONSULTA_TEMPO,
  PRIMEIRA_CONSULTA,
} from '../../../apis/cidadesApi';
import { pushAddress } from '../../manageAddress/redux/reducer';
import { select } from 'redux-saga/effects';
import {
  consultaCep,
  setAddress,
  setError,
  setLoading,
  createAdressSuccess,
  setWeather,
  primeiraConsultaCep,
} from './reducer';
import reactotron from 'reactotron-react-native';

function* watcherCreateAddresses() {
  yield takeLatest(consultaCep.type, workerConsultaCep);
}

function* workerConsultaCep({ payload }) {
  try {
    yield put(setLoading(true));
    const cidadesCadastradas = yield select(
      (state) => state.manageAddressReducerPersist.state.addressesList
    );
    reactotron.log({ cidadesCadastradas });
    let ibge;
    let address;
    let valorDuplicado = false;

    const result = yield call(CONSULTA_CEP, { cep: payload });
    if (result.erro === true) {
      yield put(setError('CEP_INVALIDO'));
      yield put(setLoading(false));
    } else {
      ibge = result.ibge;
      valorDuplicado;
      cidadesCadastradas.length > 0
        ? cidadesCadastradas.forEach((element) => {
            if (element.ibge == ibge) {
              valorDuplicado = true;
              return valorDuplicado;
            }
          })
        : (valorDuplicado = false);
      console.log({ valorDuplicado });
      if (!valorDuplicado) {
        yield put(setAddress(result.localidade, result.uf));
        yield put(setLoading(false));
        const resultTempo = yield call(CONSULTA_TEMPO, {
          cidade: result.localidade,
          uf: result.uf,
        });
        if (resultTempo) {
          address = { ...resultTempo.results, ibge };

          yield put(setWeather(resultTempo));
          yield put(pushAddress(address));
          yield put(createAdressSuccess());
        } else {
          console.log(resultTempo);
        }
      } else {
        yield put(setError('CIDADE_JA_EXISTE'));
        yield put(setLoading(false));
      }
    }
  } catch (error) {
    console.log(error);
    yield put(setLoading(false));
  }
}

export default watcherCreateAddresses;
