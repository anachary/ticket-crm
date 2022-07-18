const { TicketSchema } = require("./Ticket.schema");

const getTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ _id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save()
        .then((data) => {
          console.log(data)
          resolve(data)})
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};


const updateTicket = ({_id,ticketObj})=> {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          ...ticketObj,
        },
        { new: false }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateClientReply = ({_id, message, sender}) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          $push: {
            conversations: { message, sender },
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketUsers = async (_id, ticketObj) => {
    try {
      
      const ticket = (await TicketSchema.find({ _id }))[0]
    
      const result = []
      if(ticket && ticket.assignedTo){
        result.push(ticket.assignedTo)
      }
      if(ticket && ticket.updatedBy){
        result.push(ticket.updatedBy)
      }
      if (ticket && ticket.conversations){
          ticket.conversations.forEach(v=>result.push(v.sender))
      }
      return [...new Set(result)];
    } catch (error) {
    throw error;
    }
};

const deleteTicket = async(_id) =>{
  try {
      await TicketSchema.deleteOne({ _id })
  } catch (error) {
  throw error;
  }
};

module.exports = {
  getTickets,
  getTicketById,
  insertTicket,
  updateTicket,
  updateClientReply,
  getTicketUsers,
  deleteTicket
};
