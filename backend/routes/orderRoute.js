const express = require("express");
const { createOrder, getAllOrders, getAOrder, getMyOrders, updateOrder, deleteOrder} = require("../controller/orderCtrl");
const {isAuthenticatedUser,isAdmin} = require("../middleware/auth")
const route = express.Router();

route.post("/createorder",isAuthenticatedUser,createOrder);
route.get("/getaorder/:id",isAuthenticatedUser,getAOrder);
route.get("/getmyorders",isAuthenticatedUser,getMyOrders);
route.get("/admin/getallorders",isAuthenticatedUser,isAdmin("admin"),getAllOrders);
route.put("/admin/updateorder/:id",isAuthenticatedUser,isAdmin("admin"),updateOrder);
route.delete("/admin/deleteorder/:id",isAuthenticatedUser,isAdmin("admin"),deleteOrder);


 


module.exports = route;