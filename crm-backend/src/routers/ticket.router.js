const express = require("express")
const router = express.Router()
const {
    getTickets,
    getTicketById,
    insertTicket,
    updateTicket,
    updateClientReply,
    getTicketUsers
  } = require("../model/ticket/Ticket.model");

const { userAuthorization} = require("../middleware/authorization.middleware");
const {createNewTicketValidation, replyTicketMessageValidation} = require("../middleware/formValidation.middleware.js");
const { emailProcessor } = require("../helpers/email.helper");
const { storeUserNotification } = require("../model/user/User.model");

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
      const result = await getTicketById(_id);
  
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
          assignedDate: assignedDate||Date.now(),
          updatedBy:sender,
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
        const { _id } = req.params;
  
        const ticketObj = {
          _id,
          clientId: userId,
          subject,
          description,
          issueDate,
          status,
          priority,
          assignedTo: assignedTo ||'',
          assignedDate :assignedDate || Date.now(),
          updatedBy:sender,
          updateDate: Date.now(),
        };
  
        const result = await updateTicket({_id, ticketObj});

        const ticketUsers = await getTicketUsers({_id, ticketObj});
        
         if(ticketUsers && ticketUsers.length>0){
           ticketUsers.forEach(async (ticketUserEmail)=>{
            
            const notification = new {
              message:`There's is an update on ticket ${_id}`,
              updatedBy: sender,
              read: (sender === ticketUserEmail)
            }

            storeUserNotification(ticketUserEmail,notification)

            await emailProcessor({
              email: ticketUserEmail,
              type: "update-ticket"
            });
        
           })
         }

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
router.post(
    "/reply/:_id",
    replyTicketMessageValidation,
    userAuthorization,
    async (req, res) => {
      try {
        const { message, sender } = req.body;
        const { _id } = req.params;
        
        const result = await updateClientReply({_id, message, sender});
  
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