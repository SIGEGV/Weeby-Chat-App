// imports
const express=require("express");
const {chats}= require("./data/data")
const dotenv=require("dotenv");
const connectDB = require("./config/db");

// config
const app=express();
dotenv.config();
connectDB();




// routes-> 
app.get('/', (req,res)=>{
    res.send("api is running");
});

app.get("/api/chat",(req,res)=>{
      res.send(chats)
});



// Port 
const PORT= process.env.PORT|| 5005;

app.listen(PORT, console.log(`server is running on ${PORT} `));
