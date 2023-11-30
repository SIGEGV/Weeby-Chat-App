const express= require("express"); 
const router=express.Router();
const registerUser =require("../controller/userControllers");
const authUser=require("../controller/userControllers");

router.use(express.json());
router.route("/").post(registerUser.registerUser);
router.route("/login").post(authUser.authUser);

module.exports= router;