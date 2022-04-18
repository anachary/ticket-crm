import axios from "axios";

const rootUrl = "http://localhost:5000/v1/";
const companyUlr = rootUrl + "company/";
const updateCompanyUrl = rootUrl + "company/update-company/";

export const getAllCompanies = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:5000/v1/company", {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleCompany = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(companyUlr + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};


export const updateCompany = (_id, companyObj) => {
  return axios({
    method: 'post',
    url: updateCompanyUrl+_id,
    headers: {
      'Content-Type': ' application/json',
      'Authorization': sessionStorage.getItem("accessJWT")
    },
    data:{...companyObj}
  }).then((response) => {
    console.log(response)
  }).catch(error =>
    { 
      console.log(error)
    })
};

export const createNewCompany = (frmData) => {
  console.log("from api", frmData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(companyUlr, frmData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
