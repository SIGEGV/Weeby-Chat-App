// imports
const express=require("express");
const {chats}= require("./data/data")
var cors = require('cors')
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes")
const chatRoutes=require("./routes/chatRoutes")
const messageRoutes=require('./routes/messageRoutes')
const{notFound,errorHandler}=require("./middleware/errorMiddleware")

// config
const app=express();
dotenv.config();
connectDB();

app.use(express.json());   //The express.json() function is a middleware
                           // function used in Express.js applications to parse incoming JSON data from HTTP requests,

// routes-> 
app.get('/', (req,res)=>{
    res.send("api is running");
});

app.use(cors())
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);
// app._router.stack.forEach(function(r){
//     if (r.route && r.route.path){
//       console.log(r.route.path)
//     }
//   })
// Port 
const PORT= process.env.PORT|| 5005;

const server=app.listen(PORT, console.log(`server is running on ${PORT} `));
const io= require ("socket.io")(server, {
    pingTimeout: 60000, 
    cors:{
        origin: "http://localhost:5005",
    },
});

io.on("connection", (socket)=>{
    console.log('connected to socket');
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });
    socket.on('joinChat',(room)=>{
        socket.join(room);
        console.log("User Joined The Room: " +room);
    });
    socket.on('newMessage',(newMessageRecieved)=>{
           var chat=newMessageRecieved.chat; 

           if(!chat.user) return console.log("user.chat not defined");
           chat.user.forEach((user) => {
               if(user._id == newMessageRecieved._id) return; 
               socket.in(user._id).emit("message recieved", newMessageRecieved); 
           });
    })
});
