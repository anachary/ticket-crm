import axios from 'axios'

const loginUrl = "http://localhost:5000/v1/user/login"

export const userLogin= async(data) => {
    try{
     let res = await axios.post(loginUrl,data)
     return res
    }
    catch(error){
        console.log(error.message)
    }
    return
}

