const mongoose=require("mongoose");

const MessageModel= mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    content: {type: String, trim: true},
    chat: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"},
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
},
{
    timestamps: true, // Automatically add 'createdAt' and 'updatedAt' timestamps
}
);

const Message=mongoose.model("Message",MessageModel);
module.exports=Message;