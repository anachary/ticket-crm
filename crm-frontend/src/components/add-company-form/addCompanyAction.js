import {
  openNewCompanyPending,
  openNewCompanySuccess,
  openNewCompanyFail,
} from "./addCompanySlicer";
import { createNewCompany } from "../../api/companyApi";

export const openNewCompany = (frmData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(openNewCompanyPending());

      ////call api
      const result = await createNewCompany(frmData);
      if (result.status === "error") {
        return dispatch(openNewCompanyFail(result.message));
      }
      dispatch(openNewCompanySuccess(result.message));
    } catch (error) {
      console.log(error);
      dispatch(openNewCompanyFail(error.message));
    }
  });
};
