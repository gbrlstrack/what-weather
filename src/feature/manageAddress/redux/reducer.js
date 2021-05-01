import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const manageAddressReducer = createSlice({
  name: 'manageAddressReducer',

  initialState: { addressesList: [] },
  reducers: {
    pushAddress(state, { payload }) {
      state.addressesList.push(payload);
    },
    removeAddress(state, { payload }) {
      const deleteIndex = state.addressesList.findIndex(
        (element) => element.ibge == payload
      );
      console.log(deleteIndex);

      let cloneArray = _.cloneDeep(state.addressesList);

      cloneArray.length > 1
        ? _.pullAt(cloneArray, [deleteIndex])
        : (cloneArray = []);

      console.log(cloneArray);
      state.addressesList = cloneArray;
    },
  },
});

export const { pushAddress, removeAddress } = manageAddressReducer.actions;

export default manageAddressReducer.reducer;
