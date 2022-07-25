import axios from "axios";

const rootUrl = `http://${process.env.REACT_APP_BACKEND_SERVER_IP}:${process.env.REACT_APP_PORT}/v1/`;
const ticketUrl = rootUrl + "ticket/";
const updateTicketUrl = rootUrl + "ticket/update-ticket/";
const deleteTicketUrl = rootUrl + "ticket/delete-ticket/";
const followTicketUrl = rootUrl + "ticket/follow-ticket/";

export async function getAllTickets() {
  try {
    const result = await axios.get(ticketUrl, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });
    return result;
  } catch (error) {
    throw error
  }
};

export async function getSingleTicket(_id) {
    try {
      const result = await axios.get(ticketUrl + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw error
    }
};

export async function updateReplyTicket(_id, msgObj) {
  try {
    const response = await axios({
      method: 'post',
      url: ticketUrl + "/reply/" + _id,
      headers: {
        'Content-Type': ' application/json',
        'Authorization': sessionStorage.getItem("accessJWT")
      },
      data: { ...msgObj }
    })
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
};

export async function updateTicket(_id, ticketObj, sender='') {
  try {
    const response = await axios({
      method: 'post',
      url: updateTicketUrl + _id,
      headers: {
        'Content-Type': ' application/json',
        'Authorization': sessionStorage.getItem("accessJWT")
      },
      data: { ...ticketObj, sender}
    })
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
};

export async function createNewTicket(frmData) {
  console.log("from api", frmData);
  try {
    const result = await axios.post(ticketUrl, frmData, {
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

export async function deleteTicket(_id) {
  try {
      const response = await axios({
        method: 'post',
        url: deleteTicketUrl,
        headers:{
          'Content-Type': ' application/json',
          'Authorization': sessionStorage.getItem("accessJWT")
        },
        data: { ticket_id:_id }
      })
      return response
  } catch (error) {
    console.log(error)
    throw error
  }
};

export async function followTicket(ticket_id, user_id) {
  try {
      const response = await axios({
        method: 'post',
        url: followTicketUrl,
        headers:{
          'Content-Type': ' application/json',
          'Authorization': sessionStorage.getItem("accessJWT")
        },
        data: { ticket_id, user_id:user_id }
      })
      return response
  } catch (error) {
    console.log(error)
    throw error
  }
};

export async function fetchReportTickets(fmData) {
  try {
    const result =  await axios({
      method: 'post',
      url: ticketUrl + "reports",
      headers: {
        'Content-Type': ' application/json',
        'Authorization': sessionStorage.getItem("accessJWT")
      },
      data: { ...fmData }
    })
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
};
