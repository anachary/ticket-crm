const { TicketSchema } = require("./Ticket.schema");

const getTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketById = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    upsertTicket(ticketObj);
  });
};

const upsertTicket = (ticketObj) => {
  try {
    TicketSchema(ticketObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  } catch (error) {
    reject(error);
  }
}

module.exports = {
  getTickets,
  getTicketById,
  insertTicket
};
