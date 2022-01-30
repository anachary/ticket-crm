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

//Logger 
app.use(morgan("tiny"))

//Body Parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const port = process.env.PORT || 3001

//Load routers 
const userRouter = require("./src/routers/user.router")
const ticketRouter = require("./src/routers/user/ticket.router")

//User Router
app.use('/v1/user', userRouter)
app.use("/v1/ticket", ticketRouter)

const handleError = require("./src/utils/errorHandler")

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