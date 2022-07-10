import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client"

const initialState = {
  user: {},
  socket: io.connect("http://localhost:5000"),
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.user.authenticated = sessionStorage.getItem("accessJWT") !== null &&  localStorage.getItem("crmSite") !== null;
      state.error = "";
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  getUserPending,
  getUserSuccess,
  getUserFail,
} = userSlice.actions;

export default userSlice.reducer;
