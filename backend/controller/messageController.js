const asyncHandler = require("express-async-handler");
const Message=require('../models/MessageModel') 
const User=require("../models/UserModel")
const sendMessage =  asyncHandler(async(req,res)=>{
       
    const {content, chatId} =req.body;
    if(!content || !chatid){
        console.log("Invalid Message Passed into Request");
        res.status(400);
    }
    var newMessage={
        sender:req.user._id, 
        content: content,
        chat: chatId,
    }

    try {
        var message=await Message.create(newMessage);
        message= await message.populate("sender", "name pic");
        message= await message.populate("chat:" );
        message= await User.populate(message,{
            path: "chat.users",
            select: "name pic email",
        });
        
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        });

        res.json(message);

    } catch (error) {
        throw new Error(error.message);
    }
});


const allMessage=asyncHandler(async(req,res)=>{
     try {
        const message=await Message.find({chat: req.params.chatId}).populate("sender","name pic"). populate("chat");
        res.json(message)
     } catch (error) {
        res.status(400)
        throw new Error(error.message);
     }
})

module.exports={sendMessage, allMessage};