import { select, takeLatest, call, put } from '@redux-saga/core/effects';
import NetInfo from '@react-native-community/netinfo';
import { CONSULTA_CEP, CONSULTA_TEMPO } from '../../../apis/cidadesApi';
import {
  refreshAddress,
  refreshAddressesList,
  setIsRefreshing,
  setRefreshedAddress,
} from './reducer';
import { setError } from '../../createAddress/redux/reducer';

function* watcherManageAddresses() {
  yield takeLatest(refreshAddress.type, workerRefreshAddress);
  yield takeLatest(refreshAddressesList.type, workerRefreshAddressesList);
}

function* workerRefreshAddress({ payload }) {
  try {
    yield put(setIsRefreshing(true));

    let isConnected;
    NetInfo.fetch().then((state) => (isConnected = state.isConnected));

    if (!isConnected) {
      yield put(setError('SEM_INTERNET'));
      yield put(setIsRefreshing(false));
    } else {
      const cidadesCadastradas = yield select(
        (state) => state.manageAddressReducerPersist.state.addressesList
      );

      let ibge;
      let address;
      let cidadeEncontrada = false;

      const result = yield call(CONSULTA_CEP, { cep: payload.cep });
      if (result.erro === true) {
        console.log('Erro do cep');
        yield put(setError('CEP_INVALIDO'));
        yield put(setIsRefreshing(false));
      } else {
        ibge = payload.ibge;
        const resultTempo = yield call(CONSULTA_TEMPO, {
          cidade: result.localidade,
          uf: result.uf,
        });
        yield put(setIsRefreshing(false));
        if (resultTempo) {
          address = { ...resultTempo.results, ibge, cep: payload.cep };
          console.log('sucesso');
          yield put(setRefreshedAddress(address));
          yield put(setIsRefreshing(false));
        }
      }
    }
  } catch (error) {
    yield put(setIsRefreshing(false));
    yield put(setError('DEFAULT'));
    console.log('workerRefreshAddress', error);
  }
}

function* workerRefreshAddressesList() {
  try {
    yield put(setIsRefreshing(true));
    let isConnected;
    NetInfo.fetch().then((state) => (isConnected = state.isConnected));
    if (!isConnected) {
      yield put(setError('SEM_INTERNET'));
      yield put(setIsRefreshing(false));
    } else {
      const cidadesCadastradas = yield select(
        (state) => state.manageAddressReducerPersist.state.addressesList
      );
      let cityUF;
      let cep;
      let ibge;
      let listaAux = [];
      // console.log(cidadesCadastradas.length);
      for (let i = 0; i < cidadesCadastradas.length; i++) {
        //   console.log('cidade' + i, cidadesCadastradas[i]);
        cityUF = cidadesCadastradas[i].city.split(',');
        cep = cidadesCadastradas[i].cep;
        ibge = cidadesCadastradas[i].ibge;
        result = yield call(CONSULTA_TEMPO, {
          cidade: cityUF[0],
          uf: cityUF[1],
        });

        listaAux.push({ ...result.results, cep, ibge });
      }

      yield put(setRefreshedAddress(listaAux));
    }
  } catch (error) {
    yield put(setError('DEFAULT'));
    yield put(setIsRefreshing(false));
    console.log('workerRefreshAddressesList', error);
  }
}

export default watcherManageAddresses;
