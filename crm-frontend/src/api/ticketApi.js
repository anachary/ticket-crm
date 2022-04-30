import axios from "axios";

const rootUrl = "http://107.23.73.19:5000/v1/";
const ticketUlr = rootUrl + "ticket/";
const updateTicketUrl = rootUrl + "ticket/update-ticket/";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://107.23.73.19:5000/v1/ticket", {
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

export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketUlr + _id, {
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


export const updateReplyTicket = (_id, msgObj) => {
    return axios({
      method: 'post',
      url: ticketUlr+"/reply/"+_id,
      headers: {
        'Content-Type': ' application/json',
        'Authorization': sessionStorage.getItem("accessJWT")
      },
      data:{...msgObj}
    }).then((response) => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  };


export const updateTicket = (_id, ticketObj) => {
  return axios({
    method: 'post',
    url: updateTicketUrl+_id,
    headers: {
      'Content-Type': ' application/json',
      'Authorization': sessionStorage.getItem("accessJWT")
    },
    data:{...ticketObj}
  }).then((response) => {
    console.log(response)
  }).catch(error =>
    { 
      console.log(error)
    })
};

export const createNewTicket = (frmData) => {
  console.log("from api", frmData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUlr, frmData, {
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
