const express=require('express')
const {sendMessage, allMessage}= require('../controller/messageController')
const { protect } = require('../middleware/authMiddleware')
const router=express.Router()
router.route('/').post(protect, sendMessage)
router.route('/:chatId').post(protect, allMessage)


module.exports=router;