const mongoose = require('mongoose'); // Import the Mongoose ODM for interacting with MongoDB databases


const chatModel = mongoose.Schema({
    chatname: { type: String, trim: true }, // Field for chat's name with leading and trailing whitespace removed
    isGroupChat: { type: Boolean, default: true }, // Field indicating whether it's a group chat (default true)
    user: [{ // Field for users in the chat
        type: mongoose.Schema.Types.ObjectId, // Reference to the 'Users' collection
      ref: "Users",
    }],
    latestMessage: { // Field for the latest message in the chat
      type: mongoose.Schema.Types.ObjectId, // Reference to the 'Message' collection
      ref: "Message",
    },
    GroupAdmin: { // Field for the chat's group admin
        type: mongoose.Schema.Types.ObjectId, // Reference to the 'Users' collection
      ref: "Users",
    },
  }, {
    timestamps: true, // Automatically add 'createdAt' and 'updatedAt' timestamps
  }
);

const Chat = mongoose.model("Chat", chatModel); // Create a Mongoose model named 'Chat' based on the schema
module.exports = Chat; // Export the 'Chat' model for use in other modules
