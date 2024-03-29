import {
    fetchCompanyLoading,
    fetchCompanySuccess,
    fetchCompanyFail,
    searchCompanies,
    fetchSingleCompanyLoading,
    fetchSingleCompanySuccess,
    fetchSingleCompanyFail,
  } from "./companiesSlice.js";
  
  import {
    getAllCompanies,
    getSingleCompany
  } from "../../api/companyApi.js";
  
  export const fetchAllCompanies = () => async (dispatch) => {
    dispatch(fetchCompanyLoading());
    try {
      const result = await getAllCompanies();
      result.data.result.length &&
        dispatch(fetchCompanySuccess(result.data.result));
    } catch (error) {
      dispatch(fetchCompanyFail(error.message));
    }
  };
  
  export const filterSearchCompany = (str) => (dispatch) => {
    dispatch(searchCompanies(str));
  };
  
  //Actions for single ticket only
  export const fetchSingleCompany = (_id) => async (dispatch) => {
    dispatch(fetchSingleCompanyLoading());
    try {
      const result = await getSingleCompany(_id);
      if (result.data.result.length && result.data.result[0]) {
        let sCompany = result.data.result[0]
        sCompany.updatedDate = new Date(sCompany.updatedDate).toISOString().slice(0, 10)
        dispatch( fetchSingleCompanySuccess(sCompany))
      }
      else {
      dispatch(fetchSingleCompanyFail('No Company Exists'));
     }
    } catch (error) {
      dispatch(fetchSingleCompanyFail(error.message));
    }
  };
  
 