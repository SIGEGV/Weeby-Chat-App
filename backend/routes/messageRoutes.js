const express=require('express')
const sendMessage= require('../controller/messageController')
const allMessage=require('../controller/messageController')

const { protect } = require('../middleware/authMiddleware')
const router=express.Router()

router.route('/send').post(protect, sendMessage.sendMessage)
router.route('/:chatId').post(protect, allMessage.allMessage)


module.exports=router;