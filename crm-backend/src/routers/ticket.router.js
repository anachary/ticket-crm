const express = require("express")
const router = express.Router()
const {
    getTickets,
    getTicketById,
    insertTicket,
    updateTicket,
    updateClientReply,
    getTicketUsers,
    deleteTicket,
    followTicket
  } = require("../model/ticket/Ticket.model");

const { userAuthorization} = require("../middleware/authorization.middleware");
const {createNewTicketValidation, replyTicketMessageValidation} = require("../middleware/formValidation.middleware.js");
const { emailProcessor } = require("../helpers/email.helper");
const { storeUserNotification, getUserById } = require("../model/user/User.model");

router.all("/", (req,res,next) =>{
 //res.json({message:"ticket router is healthy"})

 next();
})

// Get all tickets for a specific user
router.get("/", userAuthorization, async (req, res) => {
    try {
      const userId = req.userId;
      const user = await getUserById(userId)
      let result = await getTickets(userId)
      
      if(user && result && result.length>0 && user.role !== "admin"){
        result = result.filter(v=>v.companyName === user.company);
      }     
  
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

        const user = await getUserById(userId)
  
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
          companyName: user.company
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
          updatedBy:sender||'',
          updateDate: Date.now(),
        };
  
        const result = await updateTicket({_id, ticketObj});

        const ticketUsers = await getTicketUsers({_id, ticketObj});
        
         if(ticketUsers && ticketUsers.length>0){
           ticketUsers.forEach(async (ticketUserEmail)=>{
            
            const notification =  {
              message:`There's is an update on ticket ${_id}`,
              updatedBy: sender||'',
              read: false
            }

            await storeUserNotification(ticketUserEmail,notification)

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
  
router.post("/delete-ticket/",
  userAuthorization,
  async (req,res)=>{
  try{
    const {ticket_id} = req.body
    await deleteTicket(ticket_id)
    return res.json({
      status: "success",
      message: "Ticket has been deleted",
    });
  } catch(error){
    res.json({ status: "error", message: error.message });
  }
}
)

router.post("/follow-ticket/",
  userAuthorization,
  async (req,res)=>{
  try{
    const {ticket_id, user_id} = req.body
    await followTicket(ticket_id, user_id)
    return res.json({
      status: "success",
      message: "Ticket has been follow by user",
    });
  } catch(error){
    res.json({ status: "error", message: error.message });
  }
}
)


router.post("/reports", userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    let result = await getTickets(userId);
    const {startDate, endDate} = req.body

    if(startDate && endDate && result){
      result = result.filter(v=>v.updatedDate>=new Date(startDate) && v.updatedDate<= new Date(endDate));
    }     

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router 