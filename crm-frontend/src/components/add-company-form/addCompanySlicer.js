import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  successMsg: "",
};
const newCompanySlice = createSlice({
  name: "newCompany",
  initialState,
  reducers: {
    openNewCompanyPending: (state) => {
      state.isLoading = true;
    },
    openNewCompanySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.successMsg = payload;
    },
    openNewCompanyFail: (state, { payload }) => {
      state.isLoading = true;
      state.error = payload;
    },
    restSuccessMSg: (state) => {
      state.isLoading = true;
      state.successMsg = "";
    },
  },
});

export const {
  openNewCompanyPending,
  openNewCompanySuccess,
  openNewCompanyFail,
  restSuccessMSg,
} = newCompanySlice.actions;
export default newCompanySlice.reducer;
