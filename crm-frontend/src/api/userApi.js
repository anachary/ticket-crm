import axios from 'axios'

const rootUrl = `http://${process.env.REACT_APP_BACKEND_SERVER_IP}:${process.env.REACT_APP_PORT}/v1/`;
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens";
const userVerificationUrl = userProfileUrl + "/verify";

export const userLogin= async (data) => {
    try{
     let res = await axios.post(loginUrl,data)
     if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
        localStorage.setItem(
          "crmSite",
          JSON.stringify({ refreshJWT: res.data.refreshJWT })
        );
    }
     return res
    }
    catch(error){
        console.log(error.message)
    }
    return
}

export const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessJWT = sessionStorage.getItem("accessJWT");
  
        if (!accessJWT) {
          reject("Token not found!");
        }
  
        const res = await axios.get(userProfileUrl, {
          headers: {
            Authorization: accessJWT,
          },
        });
  
        resolve(res.data);
      } catch (error) {
        console.log(error);
        reject(error.message);
      }
    });
  };
  
  export const fetchNewAccessJWT = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));
  
        if (!refreshJWT) {
          reject("Token not found!");
        }
  
        const res = await axios.get(newAccessJWT, {
          headers: {
            Authorization: refreshJWT,
          },
        });
  
        if (res.data.status === "success") {
          sessionStorage.setItem("accessJWT", res.data.accessJWT);
        }
  
        resolve(true);
      } catch (error) {
        if (error.message === "Request failed with status code 403") {
          localStorage.removeItem("crmSite");
        }
  
        reject(false);
      }
    });
  };
  
  export const userLogout = async () => {
    try {
      await axios.delete(logoutUrl, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  

export const userRegistration = async (frmData) => {
      try {

        const res = await axios.post(userProfileUrl, frmData);
        return res.data
    }
    catch(error){
        console.log(error.message)
        return res.data
    }
    return
}

export const userRegistrationVerification = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(userVerificationUrl, frmData);

      resolve(res.data);
      if (res.data.status === "success") {
        resolve(res.data);
      }
    } catch (error) {
      reject({ status: "error", message: error.error });
    }
  });
};


