require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet= require("helmet")
const morgan = require("morgan")



//API Security 
app.use(helmet())

//CORS
app.use(cors())



//Mongodb Setup
const mongoose = require('mongoose')
 mongoose.connect(process.env.MONGO_URI)

 if(process.env.NODE_ENV !== "production"){
    const mongoDb = mongoose.connection
    mongoDb.on("open", () => {
        console.log("MongoDb connection is successful")
    })
    mongoDb.on("error",(error) => {
        console.log(error)
    })
}
//Logger 
app.use(morgan("tiny"))


//Body Parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const port = process.env.PORT || 5000

//Load routers 
const userRouter = require("./src/routers/user.router")
const ticketRouter = require("./src/routers/ticket.router")
const tokensRouter = require("./src/routers/tokens.router");

//User Router
app.use('/v1/user', userRouter)
app.use("/v1/ticket", ticketRouter)
app.use("/v1/tokens", tokensRouter)

const handleError = require("./src/utils/errorHandler")
const { application } = require('express')

app.use((req,res,next)=>{
    const error = new Error("Resource Not Found !")
    error.status = 404
    next(error)
})

app.use((error, req,res,next)=>{
   handleError(error, res);
})


app.listen(port, ()=>{
    console.log(`API is ready on "http://localhost:${port}`)
})