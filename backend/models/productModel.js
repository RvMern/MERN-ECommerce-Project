const mongoose = require("mongoose");

// Product Model
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter The Product Name"],
        trim: true
    },
    description:{
        type: String,
        required:[true,"Please Enter The Description"]
    },
    price:{
        type: Number,
        required:[true,"Please Enter The Price"],
        maxLength: [8,"Price Should Be Under Six Digits"]
    },
    ratings:{
        type: Number,
        default:0
    },
    images:[{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    }],
    category:{
        type: String,
        required: [true,"Please Enter The Product Category"],
    },
    Stock:{
        type: Number,
        required:[true,"Please Enter The Product Stock"],
        maxLength:[4,"Stock Quantity Should Be Under Four Digits"],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name:{
                type: String,
                required: true
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type:String,
                required:true
            }
        },
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt:{
        type:Date,
        default: Date.now
    }
});


module.exports = new mongoose.model("Product",productSchema);