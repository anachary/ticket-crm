import axios from "axios";

const rootUrl = `http://${process.env.REACT_APP_BACKEND_SERVER_IP}:${process.env.REACT_APP_PORT}/v1/`;
const companyUrl = rootUrl + "company/";
const updateCompanyUrl = rootUrl + "company/update-company/";

export async function getAllCompanies() {
    try {
      const result = await axios.get(companyUrl, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT")
        },
      });
      return result 
    } catch (error) {
      throw error
    }
  }

export async function getSingleCompany(_id){
    try {
      const result = await axios.get(companyUrl + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      return result
    } catch (error) {
      console.log(error.message);
     throw error
    }
};

export  async function updateCompany(_id, companyObj) {
  try {
      const result = await axios({
      method: 'post',
      url: updateCompanyUrl+_id,
      headers: {
        'Content-Type': ' application/json',
        'Authorization': sessionStorage.getItem("accessJWT")
      },
      data:{...companyObj}
    })  
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
 
};

export async function createNewCompany(frmData){
  console.log("from api", frmData);
    try {
      const result = await axios.post(companyUrl, frmData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      return result.data
    } catch (error) {
      console.log(error.message);
      throw error
    }
};
