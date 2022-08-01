import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};

const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    registrationPending: (state) => {
      state.isLoading = true;
    },
    registrationSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = "success";
      state.message = payload;
    },
    registrationError: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.message = payload;
    },
    editRegistrationPending: (state) => {
      state.isLoading = true;
    },
    editRegistrationSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = "success";
      state.message = payload;
    },
    editRegistrationError: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.message = payload;
    },
  },
});

const { reducer, actions } = userRegistrationSlice;

export const {
  registrationPending,
  registrationSuccess,
  registrationError,
  editRegistrationPending,
  editRegistrationSuccess,
  editRegistrationError
} = actions;

export default reducer;
