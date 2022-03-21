const express = require("express");
const router = express.Router();
const {
  insertTicket,
  getTickets,
  getTicketById
} = require("../model/ticket/Ticket.model");

const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");

const {
  createNewTicketValidation,
} = require("../middlewares/formValidation.middleware");

router.all("/", (req, res, next) => {
    res.json({ message: "ticket router is healthy" })
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
            const { subject, sender, description, issueDate, status, priority, message, assignedTo, assignedDate } = req.body;

            const userId = req.userId;

            const ticketObj = {
                clientId: userId,
                subject,
                description,
                issueDate,
                status,
                priority,
                assignedTo,
                assignedDate,
                conversations: [
                    {
                        sender,
                        message,
                    },
                ],
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


module.exports = router 