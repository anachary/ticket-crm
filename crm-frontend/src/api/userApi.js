import axios from 'axios'

const rootUrl = `http://${process.env.REACT_APP_BACKEND_SERVER_IP}:${process.env.REACT_APP_PORT}/api/v1/`;
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens";
const userVerificationUrl = userProfileUrl + "/verify";
const saveNotificationsUrl =  rootUrl + "user/saveNotifications"
const usersUrl = rootUrl + "user/company-users"
const userEditProfileUrl = rootUrl + "user/edit-user";
const userDeleteProfileUrl = rootUrl + "user/delete-user";

export async function userLogin(data) {
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

export async function fetchUser(){
      try {
        const accessJWT = sessionStorage.getItem("accessJWT");
  
        if (!accessJWT) {
          return "Token not found!";
        }
  
        const res = await axios.get(userProfileUrl, {
          headers: {
            Authorization: accessJWT,
          },
        });
  
        return res.data;
      } catch (error) {
        console.log(error);
        throw error
      }
  };
  
  export async function fetchNewAccessJWT() {
    return new Promise(async (resolve, reject) => {
      try {
        const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));
  
        if (!refreshJWT) {
          return "Token not found!";
        }
  
        const res = await axios.get(newAccessJWT, {
          headers: {
            Authorization: refreshJWT,
          },
        });
  
        if (res.data.status === "success") {
          sessionStorage.setItem("accessJWT", res.data.accessJWT);
        }
  
       return true;
      } catch (error) {
        if (error.message === "Request failed with status code 403") {
          localStorage.removeItem("crmSite");
        }
  
        return false;
      }
    });
  };
  
  export async function userLogout(){
    try {
      await axios.delete(logoutUrl, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  };
  
  export async function userEditRegistration(frmData){
    try {

      const res = await axios.post(userEditProfileUrl, frmData);
      return res.data
  }
  catch(error){
      console.log(error.message)
      return res.data
  }
  return
}

  export async function userRegistration(frmData){
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

export async function userRegistrationVerification(frmData) {
    try {
      const res = await axios.patch(userVerificationUrl, frmData);
      
      if (res.data.status === "success") {
       return res.data;
      }
      return({ status: "result.data.status", message:""})
    } catch (error) {
      return({ status: "error", message: error.error });
    }
};


export async function saveNotifications(user_email) {
  try {
      const response = await axios({
        method: 'post',
        url: saveNotificationsUrl,
        headers:{
          'Content-Type': ' application/json',
          'Authorization': sessionStorage.getItem("accessJWT")
        },
        data: { user_email: user_email }
      })
      return response
  } catch (error) {
    console.log(error)
    throw error
  }
};

export async function getCompanyUsers() {
  try {
    const accessJWT = sessionStorage.getItem("accessJWT");

    if (!accessJWT) {
      return "Token not found!";
    }

    const res = await axios.get(usersUrl, {
      headers: {
        Authorization: accessJWT,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}

export async function deleteUser(email,company){
  try {
    await axios.delete(userDeleteProfileUrl, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
      data: { email, company }
    });
  } catch (error) {
    console.log(error);
    throw error
  }
};