import axios from "axios";

const rootUrl = `http://${process.env.REACT_APP_BACKEND_SERVER_IP}:${process.env.REACT_APP_PORT}/v1/`;
const companyUrl = rootUrl + "company/";
const updateCompanyUrl = rootUrl + "company/update-company/";

export const getAllCompanies = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(companyUrl, {
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
      const result = await axios.get(companyUrl + _id, {
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
      const result = await axios.post(companyUrl, frmData, {
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
