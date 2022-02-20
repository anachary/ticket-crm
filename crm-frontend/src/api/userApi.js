import axios from 'axios'
const rootUrl = "http://localhost:5000/v1/";
const loginUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";

export const userLogin= async (data) => {
    try{
     let res = await axios.post(loginUrl,data)
     return res
    }
    catch(error){
        console.log(error.message)
    }
    return
}

export const userRegistration = async (frmData) => {
      try {

        const res = await axios.post(userProfileUrl, frmData);
        return res
    }
    catch(error){
        console.log(error.message)
    }
    return
}