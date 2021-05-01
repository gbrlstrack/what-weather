import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const createAddressReducer = createSlice({
  name: 'createAddressReducer',
  initialState: {
    loading: false,
    cidade: '',
    uf: '',
    error: '',
    createAdressSuccess: undefined,
    lastWeather: {},
  },
  reducers: {
    setAddress(state, { payload, type }) {
      state.cidade = payload.cidade;
      state.uf = payload.uf;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setError(state, { payload, type }) {
      state.error = payload;
    },
    clearError(state) {
      state.error = '';
    },
    createAdressSuccess(state) {
      state.createAdressSuccess = true;
    },
    setWeather(state, { payload }) {
      state.lastWeather = payload;
    },
    clearcreateAddressSuccess(state) {
      state.createAdressSuccess = undefined;
    },
  },
});

export const consultaCep = createAction('createAddressReducer/consultaCep');

export const {
  setAddress,
  setLoading,
  setError,
  clearError,
  createAdressSuccess,
  setWeather,
  clearcreateAddressSuccess,
} = createAddressReducer.actions;
export default createAddressReducer.reducer;
