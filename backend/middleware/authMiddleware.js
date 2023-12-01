const jwt=require('jsonwebtoken');
const Users=require("../models/UserModel");
const asyncHandler=require("express-async-handler");

const protect=asyncHandler(async(req, res,next)=> {
let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
        //  token -> Bearer scusdhvdvhjcjsvsjci34
        token=req.headers.authorization.split(" ")[1];
        // decode the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user = await Users.findById(decoded.id).select("-password");
        next()
    } catch (error) {
        res.status(401);
        throw new Error("Not Authorised, token failed");
    }
}
if (!token){
    res.status(401);
    throw new Error("Not Authorised, no token");}
});

module.exports= {protect};
