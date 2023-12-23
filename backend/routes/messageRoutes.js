const express=require('express')
const { protect } = require('../middleware/authMiddleware')
const router=express.Router()
// router.route('/').post(protect, sendMessage)
// router.route('/:chatId').post(protect, allMessage)


module.exports=router;