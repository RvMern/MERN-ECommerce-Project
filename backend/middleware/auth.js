const asyncError = require("../middleware/asyncError");
const ErrorHandler = require("../utils/errorHandler");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

// Login Or Register Authentication
const isAuthenticatedUser = asyncError(
    async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login To Access Features",401));
    }

    const decodedData = JWT.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
        
});

const isAdmin = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this feature`,403))
        }
        next();
    }
};



module.exports = {isAuthenticatedUser,isAdmin};