const express=require("express");
const { protect } = require("../middleware/authMiddleware");
const router=express.Router();
const accessChats=require("../controller/chatsController");
const fetchChats=require("../controller/chatsController");
const createGroupChat=require("../controller/chatsController");
const renameGroup=require("../controller/chatsController");
const removeFromGroup=require("../controller/chatsController");
const addToGroup=require("../controller/chatsController");




router.route('/').post(protect,accessChats.accessChat);
router.route('/').get(protect,fetchChats.fetchChats);
router.route('/group').post(protect,createGroupChat.createGroupChat);
router.route('/rename').put(protect,renameGroup.renameGroup);
router.route('/groupremove').put(protect,removeFromGroup.removeFromGroup);
router.route('/groupadd').put(protect,addToGroup.addToGroup);


module.exports= router 