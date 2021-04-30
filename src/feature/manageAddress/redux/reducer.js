import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const manageAddressReducer = createSlice({
  name: 'manageAddressReducer',

  initialState: { addressesList: [] },
  reducers: {
    pushAddress(state, { payload }) {
      state.addressesList.push(payload);
    },
  },
});

export const { pushAddress } = manageAddressReducer.actions;

export default manageAddressReducer.reducer;
