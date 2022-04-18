import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  isLoading: false,
  error: "",
  replyCompanyError: "",
  searchCompanyList: [],
  selectedCompany: '',
  replyMsg: "",
};

const companyListSlice = createSlice({
  name: "companyList",
  initialState,
  reducers: {
    fetchCompanyLoading: (state) => {
      state.isLoading = true;
    },
    fetchCompanySuccess: (state, action) => {
      state.companies = action.payload;
      state.searchCompanyList = action.payload;
      state.isLoading = false;
    },
    fetchCompanyFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    searchCompanies: (state, { payload }) => {
      state.searchCompanyList = state.companies.filter((row) => {
        if (!payload) return row;

        return row.subject.toLowerCase().includes(payload.toLowerCase());
      });
    },
    fetchSingleCompanyLoading: (state) => {
      state.isLoading = true;
    },
    fetchSingleCompanySuccess: (state, { payload }) => {
      state.selectedCompany = payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchSingleCompanyFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    resetResponseMsg: (state) => {
      state.isLoading = false;
      state.replyCompanyError = "";
      state.replyMsg = "";
    }
  }
});


const { reducer, actions } = companyListSlice;

export const {
  fetchCompanyLoading,
  fetchCompanySuccess,
  fetchCompanyFail,
  fetchSingleCompanyLoading,
  fetchSingleCompanySuccess,
  fetchSingleCompanyFail,
  searchCompanies,
  resetResponseMsg
} = actions;

export default reducer;
