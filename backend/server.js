// imports
const express=require("express");
const {chats}= require("./data/data")
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes")
const chatRoutes=require("./routes/chatRoutes")
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

app.get("/api/chat",(req,res)=>{
      res.send(chats)
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// error handlers
app.use(notFound);
app.use(errorHandler);


// Port 
const PORT= process.env.PORT|| 5005;

app.listen(PORT, console.log(`server is running on ${PORT} `));
