const express= require("express"); 
const router=express.Router();
const registerUser =require("../controller/userControllers");
const authUser=require("../controller/userControllers");
const allUsers=require("../controller/userControllers");
const {protect}=require("../middleware/authMiddleware")

router.use(express.json());

/*
@Route->/api/user
@Description-> to register the user
*/
router.route("/").post(registerUser.registerUser);


router.route("/").get(protect, allUsers.allUsers);
/*
Route-> /api/user/login
@Description-> to login the user
*/
router.route("/login").post(authUser.authUser);

module.exports= router;