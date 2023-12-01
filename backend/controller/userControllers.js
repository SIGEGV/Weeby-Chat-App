const asyncHandler = require("express-async-handler");
const Users=require("../models/UserModel");
const generateToken=require("../config/generateToken");

const registerUser= asyncHandler( async(req,res)=>{
           const{name, email,password, pic  }=req.body;
           if(!email || !password|| !name){
            res.status(400);
            throw new Error("Please enter all the Feilds");
           }
            const userExists=await Users.findOne({email});
            if(userExists){
                res.status(400);
                throw new Error("User already Exist");
            }

    const user= await Users.create({
        name,
        email,
        password,
        pic,
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create User");
    }
}
);








const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Users.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  

module.exports={registerUser,authUser};