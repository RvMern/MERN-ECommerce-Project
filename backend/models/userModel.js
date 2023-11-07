const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt"); 
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

// User Model
const userSchema = new mongoose.Schema({
    role:{
        type:String,
        default:"user"
    },
    name:{
        type: String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name Should not exceed 30 characters"],
        minLength:[4,"Name Should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique: true,
        validate:[validator.isEmail,"Please Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be more than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type:String,
            required:true
        }
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },

    resetPasswordToken:String,
    resetPasswordExpire: Date,
});


// This will only hash password if the password is modifid
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// Token Generation
userSchema.methods.getJWTToken = function(){
    return JWT.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE});
};

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
};

// Reset Token Generation
userSchema.methods.getResetPasswordToken = function(){
    
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken =  crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema);