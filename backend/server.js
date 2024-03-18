 // --------------------------Imports------------------------------
const express=require("express");
var cors = require('cors')
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes")
const chatRoutes=require("./routes/chatRoutes")
const messageRoutes=require('./routes/messageRoutes')
const{notFound,errorHandler}=require("./middleware/errorMiddleware")
// const path=require('path')
// --------------------------Imports------------------------------



// --------------------------Config-------------------------------


const app=express();
dotenv.config();
connectDB();

app.use(express.json());   //The express.json() function is a middleware
                           // function used in Express.js applications to parse incoming JSON data from HTTP requests,


// --------------------------Config-------------------------------



// --------------------------routes------------------------------- 

app.use(cors({
    origin: "https://weeby-chat.netlify.app"
}));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

// --------------------------routes-------------------------------

// --------------------------Error Handlers------------------------


app.use(notFound);
app.use(errorHandler);


// --------------------------Error Handlers------------------------



// -------------------------- Port ---------------------------------
const PORT= process.env.PORT|| 5005;

const server=app.listen(PORT, console.log(`server is running on ${PORT} `));

// -------------------------- Port ---------------------------------


  

// --------------------------Socket-Connection------------------------------

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.user) return console.log("chat.users not defined");
  
      chat.user.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
// --------------------------Socket-Connection------------------------------
