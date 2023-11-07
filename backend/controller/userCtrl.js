const ErrorHandler = require("../utils/errorHandler");
const AsyncError = require("../middleware/asyncError");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const sendJWTToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Create A User
const createUser = AsyncError(
    async(req, res,next) =>{
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        const {name,email,password} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });
    
        sendJWTToken(user, 201, res);
});


// Login A User
const userLogin = AsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
       return next(new ErrorHandler("Please Enter Both Email And Password For Login",400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))     // 401 means Unauthorized
    }

    sendJWTToken(user, 200, res);
    
    const subject = `Login Notification from [EShopping] to ${user.name}`;
    const message = `${user.name} Has Been Successfully Logged In`;

    await sendEmail({message,email:user.email,subject});
    
});

// Logout A User
const userLogout = AsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
});

// Forgot Password Token Generation And Sending An Email To User With Token To Reset Password
const forgotPassword = AsyncError(async(req,res,next) =>{

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordURL = `${req.protocol}://${req.get('host')}/password/resetpassword/${resetToken}`;
    const message = `Your Reset Password token is \n\n ${resetPasswordURL} \n\n If you have not requested this email then please ignore it`;
    
    try{
        await sendEmail({
            email:user.email,
            subject:`E-Commerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email has been sent to ${user.email} successfully`
        })
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }
});

// Reset Password 
const resetPassword  = AsyncError(async (req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendJWTToken(user,200,res);

});

// Get User Profile
const getUserProfile = AsyncError(async(req,res,next)=>{
    const userProfile = await User.findOne(req.user._id);
    res.status(200).json({
        success:true,
        userProfile
    })
});


// User Update Password
const userUpdatedPassword = AsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect",400));
    }
    if(req.body.newpassword !== req.body.confirmnewpassword){
        return next(new ErrorHandler("Password Does Not Match",400));
    }
    user.password = req.body.newpassword;
    await user.save();

    sendJWTToken(user,200,res);

    res.status(200).json({
        success:true,
        user
    })
});

// User Update Details 
const userDetailsUpdate = AsyncError(async(req,res,next)=>{
    let {name,email} = req.body;
    const newUserDetails = {
        name,
        email
    }

    if(req.body.avatar !== ""){
        const user = await User.find(req.user._id);
        const imageId = user.avatar.public_id ;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        newUserDetails.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }

    }

    const user = await User.findByIdAndUpdate(req.user._id,newUserDetails,{new:true, runValidators:true,useFindAndModify:false});

    res.status(200).json({
        success:true,
        user
    })
});

// Get All Users For Admin Dashboard
const getAllUsers = AsyncError(
    async(req,res,next)=>{
        const allUsersDetails = await User.find();
        res.status(200).json({
            success:true,
            allUsersDetails
        });
});

// Get A Single User
const getAUser = AsyncError(
    async(req,res,next)=>{
        const userDetail = await User.findById(req.params.id);
        if(!userDetail){
            return next(new ErrorHandler(`User Does Not Exist with ${req.params.id}`,400));
        }

        res.status(200).json({
            success:true,
            userDetail
        });
});

// Update A User Role From Admin Dashboard
const updateAUser = AsyncError(
    async(req,res,next)=>{
        const userDetail = await User.findById(req.params.id);
        if(!userDetail){
            return next(new ErrorHandler(`User Does Not Exist with ${req.params.id}`,400));
        }
        userDetail.role = req.body.role;
        userDetail.save();

        res.status(200).json({
            success:true,
            message: "User Role Has Been Updated Successfully"
        });
});

// Delete A User From Admin Dashboard
const deleteAUser = AsyncError(
    async(req,res,next)=>{
        const userDetail = await User.findById(req.params.id);
        if(!userDetail){
            return next(new ErrorHandler(`User Does Not Exist with ${req.params.id}`,400));
        }

        await cloudinary.v2.uploader.destroy(userDetail.avatar.public_id);

        await User.deleteOne(userDetail);
        res.status(200).json({
            success:true,
            message: "User Has Been Deleted Successfully"
        });
});


module.exports = {
createUser,
userLogin,
userLogout,
forgotPassword,
resetPassword,
getUserProfile,
userUpdatedPassword,
userDetailsUpdate,
getAllUsers,
getAUser,
updateAUser,
deleteAUser
};