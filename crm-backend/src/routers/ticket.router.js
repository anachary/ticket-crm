const express = require("express")
const router = express.Router()
const {
    getTickets,
    getTicketById,
    insertTicket,
    updateTicket,
    updateClientReply
  } = require("../model/ticket/Ticket.model");

const { userAuthorization} = require("../middleware/authorization.middleware");3
const {createNewTicketValidation, replyTicketMessageValidation} = require("../middleware/formValidation.middleware.js")

router.all("/", (req,res,next) =>{
 //res.json({message:"ticket router is healthy"})

 next();
})

// Get all tickets for a specific user
router.get("/", userAuthorization, async (req, res) => {
    try {
      const userId = req.userId;
      const result = await getTickets(userId);
  
      return res.json({
        status: "success",
        result,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });
  
  // Get all tickets for a specific user
  router.get("/:_id", userAuthorization, async (req, res) => {
    try {
      const { _id } = req.params;
  
      const clientId = req.userId;
      const result = await getTicketById(_id, clientId);
  
      return res.json({
        status: "success",
        result,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });


// create new ticket
router.post(
    "/",
    createNewTicketValidation,
    userAuthorization,
    async (req, res) => {
      try {
        const { subject, sender, description,issueDate, status, priority, message, assignedTo, assignedDate} = req.body;
  
        const userId = req.userId;
  
        const ticketObj = {
          clientId: userId,
          subject,
          description,
          issueDate,
          status,
          priority,
          assignedTo: assignedTo,
          assignedDate,
          updatedBy:sender,
          updateDate: Date.now(),
          conversations: [],
        };
  
        const result = await insertTicket(ticketObj);
  
        if (result._id) {
          return res.json({
            status: "success",
            message: "New ticket has been created!",
          });
        }
  
        res.json({
          status: "error",
          message: "Unable to create the ticket , please try again later",
        });
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
    }
  );
  

// update ticket
router.post("/update-ticket/:_id", userAuthorization, async (req, res) => {
    
    try {
    const { subject, sender, description,issueDate, status, priority, assignedTo, assignedDate} = req.body;
  
        const userId = req.userId;
  
        const ticketObj = {
          clientId: userId,
          subject,
          description,
          issueDate,
          status,
          priority,
          assignedTo: assignedTo,
          assignedDate,
          updatedBy:sender,
          updateDate: Date.now(),
        };
  
        const result = await updateTicket(ticketObj, message);
        
        if (result._id) {
          return res.json({
            status: "success",
            message: "Ticket has been updated!",
          });
        }
  
        res.json({
          status: "error",
          message: "Unable to update the ticket , please try again later",
        });
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
  });


// update reply message form client
router.put(
    "/:_id",
    replyTicketMessageValidation,
    userAuthorization,
    async (req, res) => {
      try {
        const { message, sender } = req.body;
        const { _id } = req.params;
  
        const result = await updateClientReply({ _id, message, sender });
  
        if (result._id) {
          return res.json({
            status: "success",
            message: "your message updated",
          });
        }
        res.json({
          status: "error",
          message: "Unable to update your message please try again later",
        });
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
    }
  );
  
module.exports = router 