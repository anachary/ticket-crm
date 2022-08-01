import {
    registrationPending,
    registrationSuccess,
    registrationError,
    editRegistrationPending,
    editRegistrationSuccess,
    editRegistrationError,
  } from "./userRegistrationSlice";
  
  import { userRegistration, userEditRegistration } from "../../api/userApi";
  
  export const newUserRegistration = (frmDt) => async (dispatch) => {
    try {
      dispatch(registrationPending());
  
      const result = await userRegistration(frmDt);
      result.status === "success"
        ? dispatch(registrationSuccess(result.message))
        : dispatch(registrationError(result.message));
  
      console.log(result);
    } catch (error) {
      dispatch(registrationError(error.message));
    }
  };
  
  export const editUserRegistration = (frmDt) => async (dispatch) => {
    try {
      dispatch(editRegistrationPending());
  
      const result = await userEditRegistration(frmDt);
      result.status === "success"
        ? dispatch(editRegistrationSuccess(result.message))
        : dispatch(editRegistrationError(result.message));
  
      console.log(result);
    } catch (error) {
      dispatch(editRegistrationError(error.message));
    }
  };
  