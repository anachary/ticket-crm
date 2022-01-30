const express = require("express")
const router = express.Router()

router.all("/", (req,res,next) =>{
 res.json({message:"ticket router is healthy"})
})

module.exports = router 