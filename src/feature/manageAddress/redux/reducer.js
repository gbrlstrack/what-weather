import { createAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const manageAddressReducer = createSlice({
  name: 'manageAddressReducer',

  initialState: {
    addressesList: [],
    isRefreshing: false,
    ultimasConsultas: [],
  },
  reducers: {
    pushAddress(state, { payload }) {
      state.addressesList.unshift(payload);
    },
    removeAddress(state, { payload }) {
      const deleteIndex = state.addressesList.findIndex(
        (element) => element.ibge == payload
      );

      let cloneArray = _.cloneDeep(state.addressesList);

      cloneArray.length > 1
        ? _.pullAt(cloneArray, [deleteIndex])
        : (cloneArray = []);

      state.addressesList = cloneArray;
    },
    refreshAddress(state, { payload }) {
      state.isRefreshing = false;
    },
    setIsRefreshing(state, { payload }) {
      state.isRefreshing = payload;
    },
    setRefreshedAddress(state, { payload }) {
      let toReWriteIndex;
      payload.length > 1
        ? payload.forEach((cidade) => {
            toReWriteIndex = state.addressesList.findIndex(
              (item) => item.ibge == cidade.ibge
            );
            state.addressesList[toReWriteIndex] = cidade;
          })
        : (state.addressesList[0] = payload);

      state.isRefreshing = false;
    },
    clearUltimasConsultas(state) {
      state.ultimasConsultas = [];
    },
  },
});

export const refreshAddressesList = createAction(
  'manageAddressReducer/refreshAddressesList'
);

export const {
  pushAddress,
  removeAddress,
  refreshAddress,
  setIsRefreshing,
  setRefreshedAddress,
  clearUltimasConsultas,
} = manageAddressReducer.actions;

export default manageAddressReducer.reducer;
