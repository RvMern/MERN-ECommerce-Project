const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncError = require("../middleware/asyncError");

// Create An Order
const createOrder = AsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(201).json({
        success:true,
        order
    });
});


// Get A Single Order
const getAOrder = AsyncError(async(req,res,next)=>{
const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("Order Not Found With This Id",404));
    };
    res.status(201).json({
        success:true,
        order
    });
});

// Get User Orders
const getMyOrders = AsyncError(async(req,res,next)=>{
    const orders = await Order.find({user: req.user._id}).populate("user","name email");
        if(!orders){
            return next(new ErrorHandler("Order Not Found With This Id",404));
        };
        res.status(201).json({
            success:true,
            orders
        });
});

// Get All Orders
const getAllOrders = AsyncError(async(req,res,next)=>{
    const allorders = await Order.find();

    if(!allorders){
        return next(new ErrorHandler("Orders Not Found",404));
    }

    let totalAmount = 0;
    allorders.forEach((ord)=>{
      totalAmount += ord.totalPrice
    });

    res.status(201).json({
        success:true,
        allorders,
        totalAmount
    });
});

// Update An Order
const updateOrder = AsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order Has Already Been Deleted",404));
    };
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("This product has already been delivered to its rightful owner",400));
    }

    if(order.orderStatus !== "Delivered"){
        order.orderItems.forEach(async(ord)=>{
            await updateStock(order,ord.product, ord.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false})

    res.status(201).json({
        success:true
    });
});

async function updateStock(order,productID,quantity){
    const product = await Product.findById(productID);
    product.Stock -= quantity;
    await product.save({validateBeforeSave:false});
}

// Delete An Order
const deleteOrder = AsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order Has Already Been Deleted",404));
    };
    await Order.findByIdAndDelete(order._id)

    res.status(201).json({
        success:true,
        message:`Product with id ${order._id} has been deleted successfully`
    });
});



module.exports = {
createOrder,
getAllOrders,
getAOrder,
getMyOrders,
updateOrder,
deleteOrder
}