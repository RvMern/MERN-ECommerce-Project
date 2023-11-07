const express = require("express");
const cors = require("cors");
const app = require("./app");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const paymentRoute = require("./routes/paymentRoute");
const orderRoute = require("./routes/orderRoute");
const fileUploader = require("express-fileupload");
const cloudinary = require("cloudinary");
const path = require('path');

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config();
}

const dbConnect = require("./dbConnect/dbConnect");

app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUploader());
app.use(express.json());
app.use(cookieParser());

// Error Handling Middleware
const errorMiddleware = require("./middleware/error");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

// Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

// Database Connection
dbConnect();

// Cloudinary Configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use("/api/v1/product",productRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/payment",paymentRoute);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

// Middleware for Error
app.use(errorMiddleware);

// Server Configuration
const server = app.listen(PORT,HOSTNAME,()=>{
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`)
 });


 // Unhandle Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');

    server.close(()=>{
        process.exit(1);
    })
})


