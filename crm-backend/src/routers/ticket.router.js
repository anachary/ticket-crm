const express = require("express")
const router = express.Router()
const {
    getTickets,
    getTicketById,
  } = require("../model/ticket/Ticket.model");

const { userAuthorization} = require("../middlewares/authorization.middleware");

router.all("/", (req,res,next) =>{
 res.json({message:"ticket router is healthy"})
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

module.exports = router 