require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet= require("helmet")
const morgan = require("morgan")
const autoIncrement = require('mongoose-auto-increment');
const {Server} = require("socket.io")
const http = require("http")

//API Security 
app.use(helmet())

//CORS
app.use(cors())



//Mongodb Setup
const mongoose = require('mongoose')
 mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

 if(process.env.NODE_ENV !== "production"){
    const mongoDb = mongoose.connection
    mongoDb.on("open", () => {
        console.log("MongoDb connection is successful")
        autoIncrement.initialize(mongoDb);
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
const companyRouter = require("./src/routers/company.router");

//User Router
app.use('/v1/user', userRouter)
app.use("/v1/ticket", ticketRouter)
app.use("/v1/tokens", tokensRouter)
app.use("/v1/company", companyRouter)


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

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
    }
});

let onlineUsers = [];

const addNewUser = (id, socketId) => {
  !onlineUsers.some((user) => user._id === id) &&
    onlineUsers.push({id , socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  return onlineUsers.find((user) => user._id === id);
};

io.on("connection", (socket) => {
  socket.on("newUser", (id) => {
    addNewUser(id, socket.id);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});


server.listen(port, ()=>{
    console.log(`API is ready on "http://localhost:${port}`)
})